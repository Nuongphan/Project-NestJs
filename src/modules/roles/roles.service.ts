import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import Role from 'src/type/role.type';

@Injectable()
export class RolesService {

    constructor(private readonly roleRepo: RolesRepository) { }

    async getRoles(): Promise<Role[]> {
        const roles = await this.roleRepo.getRoles();
        return roles
    }

    async createRole(body): Promise<Role> {
        return await this.roleRepo.createRole(body)
    }

    async deleteRole(idd) {
        const role = await this.roleRepo.findRole(idd)
        if (!role) {
            return { msg: "Role not found" }
        }
        return this.roleRepo.deleteRole(idd)
    }

}
