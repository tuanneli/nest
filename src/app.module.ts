import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {UserModel} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {RoleModel} from "./roles/roles.model";
import {UserRoleModel} from "./roles/user-role.model";
import {AuthModule} from './auth/auth.module';
import {PostsModule} from './posts/posts.module';
import {PostsModel} from "./posts/posts.model";
import {FilesModule} from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            models: [UserModel, RoleModel, UserRoleModel, PostsModel],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ],
})
export class AppModule {
}