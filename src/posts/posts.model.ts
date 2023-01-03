import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../users/users.model";

interface IPostCreationAttrs {
    title: string,
    content: string
    userId: number
    image: string
}

@Table({tableName: 'posts'})
export class PostsModel extends Model<PostsModel, IPostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => UserModel)
    author: UserModel
}