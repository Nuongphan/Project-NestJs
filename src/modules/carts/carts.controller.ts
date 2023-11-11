import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import {  AuthGuard } from '../auth/guard/jwt-auth.guard';




@Controller('carts')
export class CartsController {

    constructor(private readonly cartsService: CartsService) { }

    @Get("/cartByUser/:idUser")
    @UseGuards(AuthGuard )
    getCartByUser(@Param() idUser) {

        return this.cartsService.getCartByUser(idUser)

    }

    @Post("/:idUser")
    createCarts(@Body() body, @Param() idUser) {
        return this.cartsService.createCarts(body, idUser)

    }

    @Put("/:idCart")
    changeQuantity(@Param("idCart") idCart, @Body() body) {

        return this.cartsService.changeQuantity(idCart, body)

    }

    @Delete("/:idCart")
    deleteCart(@Param("idCart") idCart) {

        return this.cartsService.deleteCart(idCart)
        
    }

}
