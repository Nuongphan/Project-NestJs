import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {

    constructor(private readonly appService: FavoritesService) { }

 @Get("/:userId")
  async getfavoriteByUserId(@Param() userId) {
       const result = await this.appService.getFavoriteByUserId(userId);
       return result
    }

    @Post("/:userId") 
    createFavorite(@Param() userId, @Body() productId) {
        return this.appService.createFavorite(userId, productId)
    }

    @Delete("/favorites/:id")
    deleteFavorite(@Param() id) {  
        return this.appService.deleteFavorite(id)
    }
}
