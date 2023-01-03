import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {RoleModel} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {RolesService} from "./roles.service";

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {
    }

    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto);
    }

    @Get('/:value')
    getRoles(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

}
