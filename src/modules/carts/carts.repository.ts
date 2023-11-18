import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './database/entity/carts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsRepository {

    constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>) { }

    async getCartByUser(idUser) {

        const userId = idUser.idUser
        return this.cartRepository.find({where: {userId:userId}})

    }

    async productIncartUser(idUser, body) {

        const userId = idUser.idUser;
        const productIdd = body.id
        const result = await this.cartRepository.findOne({ where: { productId: productIdd, userId: userId } })
        return result

    }

    async updateQuantityProduct(quantityProduct, id) {

        return await this.cartRepository.update(id, { quantity: quantityProduct })

    }
    
    async createCarts(body, idUser,idProduct,  name, price, image) {

        return await this.cartRepository.save({ userId: idUser.idUser, quantity: body.quantity, productId:idProduct, name:name,  price:price, thumbnailUrl:image})
   
    }

    async changeQuantity(idCart, body) {

        return await this.cartRepository.update(idCart, { quantity: Number(body.quantity) })

    }

    async deleteCart(idCart) {

        return await this.cartRepository.delete(idCart)

    }

    async getCart(idCart) {

        return await this.cartRepository.findOne({ where: { id: idCart } })
        
    }

}