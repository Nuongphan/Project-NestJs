import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repositori';
import { UserRepository } from '../users/users.repository';
import { ProductRepository } from '../products/products.repositori';

@Injectable()
export class FavoritesService {
    constructor(private readonly favoriteRepo: FavoritesRepository,
        private readonly userRepo: UserRepository, 
        private readonly productRepo: ProductRepository)  {}

    async getFavoriteByUserId(userId) {
        const user= await this.userRepo.getUserWithId(userId.userId)
        if(!user) {
            return {msg: "user not found", success: false}
        }
        const result= await this.favoriteRepo.getFavoriteByUserId(userId)
        return result
    }

    async  createFavorite(userId, body) {     
        const user= await this.userRepo.getUserWithId(userId.userId)
        if(!user) {
            return {msg: "user not found", success: false}
        }
        const productFavorite= await this.favoriteRepo.findProduct(body)
        if(productFavorite) {
            return {msg: "Product is Exist", success: false}
        }
        return await this.favoriteRepo.createFavorite(userId, body)
    }

    async deleteFavorite(productId) {
        const productFavorite= await this.favoriteRepo.findProduct(productId)
        if(!productFavorite) {
            return {msg: "Product is not Exist", success: false}
        }
        return await this.favoriteRepo.deleteFavorite(productId)
    }
}
