import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-users.dto';
import {AuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role-author.guard';
import { CreateAddressDTO } from '../addresses/dto/create-address.dto';
import { ChangeAddressDTO } from '../addresses/dto/change-address.dto';



@Controller('users')
export class UsersController {

    constructor(private  appService: UsersService) { }

    @Post("/register")
    async register(@Body() body: CreateUserDTO) {
        const user = await this.appService.register(body) 
        return user
    }

    // @UseGuards(AuthGuard, RolesGuard)  
    @Get()
    getUsers(@Query() page) {
        return this.appService.getUsers(page)
    }
 
    @Put("/:id")
    @UseGuards(AuthGuard, RolesGuard)
    changeStatusUser(@Param() id) {
        return this.appService.changeStatusUser(id)
    }

    @Get("/:id/address")
    @UseGuards(AuthGuard)
    getUserInfor(@Param() id) {
        return this.appService.getUserInfor(id)
    }

    @Post("/:id/address")
    @UseGuards(AuthGuard)
    createAddress(@Param() id, @Body() body: CreateAddressDTO) {
        return this.appService.createAddress(id, body)
    }

    @Put("/:idUser/address/:idAddress")
    @UseGuards(AuthGuard)
    changeAddress(@Param("idUser") idUser, @Param("idAddress") idAddress, @Body() body: ChangeAddressDTO) {
        return this.appService.changeAddress(idUser, idAddress, body)
    }

    @Get("/verify")
    verifyEmail(@Query("token") token: string, @Query("userId") userId, @Query("id") id) {
      const result= this.appService.verifyEmail(token, userId,id)  
      return ""
    }

    @Get("/forgotpassword") 
    forgotpassword(){
        return 
    }

    @Post("/forgotpassword") 
    sendForgotpassword(@Body() body) {
        return this.appService.sendForgotpassword(body)
    }

    @Get("resetpassword")
    resetpassword() {
        return 
    }

    @Post("/resetpassword")
    sendResetpassword(@Body() body) {  
        return this.appService.sendResetpassword(body)
    }

}