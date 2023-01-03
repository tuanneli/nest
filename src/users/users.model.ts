import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {RoleModel} from "../roles/roles.model";
import {UserRoleModel} from "../roles/user-role.model";
import {Post} from "@nestjs/common";
import {PostsModel} from "../posts/posts.model";

interface IUserCreationAttrs {
    name: string,
    password: string
}

@Table({tableName: 'users'})
export class UserModel extends Model<UserModel, IUserCreationAttrs> {

    @ApiProperty({example: "1", description: "Unique user's id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "user@gmail.com", description: "User's name"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example: "1234", description: "User's password"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: "false", description: "Is user banned"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: "", description: "The ban reason"})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles: RoleModel[];

    @HasMany(() => PostsModel)
    posts: PostsModel[];
}