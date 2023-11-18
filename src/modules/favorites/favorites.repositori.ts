import { Injectable } from '@nestjs/common';
import { Favorite } from './database/entity/favorites.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesRepository {
    constructor(@InjectRepository(Favorite) private FavoriteRepository: Repository<Favorite>) { }

    async getFavoriteByUserId(userId) {
        return await this.FavoriteRepository
            .createQueryBuilder('favorites')
            .innerJoinAndSelect('favorites.product', 'product')
            .innerJoinAndSelect('product.category', 'category')
            .innerJoinAndSelect('product.image', 'image')
            .where('favorites.userId = :userId', { userId: userId.userId })
            .getMany();
    }

    async findProduct(body) {
        
        return await this.FavoriteRepository.findOne({ where: { id: body.id } })
    }

    async createFavorite(userId, body) {

        return await this.FavoriteRepository.save({ userId: userId.userId, productId: body.id })
    }

    async findProductInFavorite(userIdd, productIdd) {
        const productId= productIdd.id
        const userId=userIdd.userId
       const result=await this.FavoriteRepository
            .createQueryBuilder('favorites')
            .where('favorites.userId = :userId', { userId })
            .andWhere('favorites.productId = :productId', { productId })
            .getOne();
            return result;
            
    }

    async deleteFavorite(productId) {

        const result = await this.FavoriteRepository.delete({id: productId.id })

        return result
    }

}