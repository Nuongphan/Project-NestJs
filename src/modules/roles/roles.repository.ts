import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "./database/entity/roles.entity";
import { Repository } from "typeorm";
import Role from "src/type/role.type";


@Injectable()
export class RolesRepository {

    constructor(@InjectRepository(Roles) private rolesRepository: Repository<Roles>) { }

    async getRoles(): Promise<Role[]> {
        return await this.rolesRepository.find()
    }

    async createRole(body): Promise<Role> {
        const role = Number(body.role)
        return await this.rolesRepository.save({ role: role })
    }

    async findRole(idd) {
        const role = await this.rolesRepository.findOne({ where: { id: idd } })
        return role
    }

    async deleteRole(idd) {
        return await this.rolesRepository.delete(idd)
    }
    
}