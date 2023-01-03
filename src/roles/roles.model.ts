import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../users/users.model";
import {UserRoleModel} from "./user-role.model";

interface IRoleCreationAttrs {
    value: string,
    description: string
}

@Table({tableName: 'roles'})
export class RoleModel extends Model<RoleModel, IRoleCreationAttrs> {
    @ApiProperty({example: "1", description: "Unique role's id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "ADMIN", description: "Role"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: "Administrator", description: "Description of a role"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => UserModel, () => UserRoleModel)
    users: UserModel[];
}