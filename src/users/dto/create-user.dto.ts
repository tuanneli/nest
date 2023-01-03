import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "user@mail.ru", description: "The name of the user"})
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly name: string;
    @ApiProperty({example: "1234", description: "The password of the user"})
    @IsString({message: 'Must be a string'})
    @Length(4, 50, {message: "The length mush be longer than 4 and less than 50 symbols"})
    readonly password: string;
}