import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {UserModel} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.name);
        console.log(candidate)
        if (candidate) {
            throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: UserModel) {
        const payload = {
            email: user.name,
            id: user.id,
            roles: user.roles
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.name);
        if (!user) {
            throw new UnauthorizedException({message: 'Incorrect email or password'});
        }
        const isPassCorrect = bcrypt.compare(userDto.password, user.password);
        if (!isPassCorrect) {
            throw new UnauthorizedException({message: 'Incorrect email or password'});
        }
        return user;
    }
}
