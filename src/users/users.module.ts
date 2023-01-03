import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./users.model";
import {RoleModel} from "../roles/roles.model";
import {UserRoleModel} from "../roles/user-role.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {PostsModel} from "../posts/posts.model";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([UserModel, RoleModel, UserRoleModel, PostsModel]),
        RolesModule,
        forwardRef(() => AuthModule)
    ],
    exports: [UsersService]
})
export class UsersModule {
}
