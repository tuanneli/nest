import {Injectable} from '@nestjs/common';
import {RoleModel} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class RolesService {

    constructor(@InjectModel(RoleModel) private roleRepository: typeof RoleModel) {
    }

    createRole(roleDto: CreateRoleDto) {
        return this.roleRepository.create(roleDto)
    }

    getRoleByValue(value: string) {
        return this.roleRepository.findOne({where: {value}});
    }

}
