import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: "USER", description: "The value of the role"})
    readonly value: string;
    @ApiProperty({example: "User", description: "The description of the role"})
    readonly description: string;
}