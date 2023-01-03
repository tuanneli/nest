import {Module} from '@nestjs/common';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {PostsModel} from "./posts.model";
import {UserModel} from "../users/users.model";
import {Sequelize} from "sequelize-typescript";
import {SequelizeModule} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {FilesModule} from "../files/files.module";

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        SequelizeModule.forFeature([PostsModel, UserModel]),
        FilesModule
    ]
})
export class PostsModule {
}
