import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {

    constructor(private readonly appService: ProductsService) { }

    @Post()
    createProduct(@Body() body) {
        return this.appService.createProduct(body)
    }

    @Delete("/:id")
    deleteProduct(@Param() id) {
        return this.appService.deleteProduct(id)
    }

    @Get()
    async getProducts(@Query() page) {
        return   await this.appService.getProducts(page)
    }

    @Put("/update/:id") 
    updateProduct(@Param() id, @Body() body) {
        return this.appService.updateProduct(id, body)
    }

    @Get("/:id")
    getProductDetail(@Param() id) {
        return this.appService.getProductDetail(id)
    }

    @Get("/newarrival/productnewarrival")
    getNewarrival() {
        const result = this.appService.getNewarrival()
        return result
    }

}
