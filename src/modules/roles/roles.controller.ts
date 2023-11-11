import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './database/entity/roles.entity';
import Role from 'src/type/role.type';

@Controller('roles')
export class RolesController {

    constructor(private readonly appService: RolesService) { }

    @Get()
    getRoles(): Promise<Role[]> {
        return this.appService.getRoles()
    }

    @Post() 
    createRole(@Body() body): Promise<Role>    {
        return this.appService.createRole(body)
    }

    @Delete("/:id")
    delete(@Param() id) {
        const idd=Number(id.id)
        return this.appService.deleteRole(idd)   
    }

}
