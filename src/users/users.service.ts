import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {RoleModel} from "../roles/roles.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {where} from "sequelize";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel, private rolesService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER');
        await user.$set('roles', role); // Adds role to DB
        user.roles = [role]; // Adds role to user
        return user;
    }

    async getAllUsers() {
        return this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(name: string) {
        return this.userRepository.findOne({where: {name}, include: {all: true}})
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('roles', role);
            return dto;
        }
        throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
