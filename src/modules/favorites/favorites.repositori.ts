import { Injectable } from '@nestjs/common';
import { Favorite } from './database/entity/favorites.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesRepository {
    constructor(@InjectRepository(Favorite) private FavoriteRepository: Repository<Favorite>) {}

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
        return await this.FavoriteRepository.findOne({where: {productId: body.id}})
    }

    async createFavorite(userId, body) {
        console.log("654738029-39485743",userId, body );
        
        return await this.FavoriteRepository.save({userId: userId.userId, productId: body.id})
    }

    async deleteFavorite(productId) {
        console.log(productId);
        return await this.FavoriteRepository.delete({id: productId.productId})
    }
    
}