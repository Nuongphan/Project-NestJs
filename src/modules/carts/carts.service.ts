import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { UserRepository } from '../users/users.repository';
import { ProductRepository } from '../products/products.repositori';

@Injectable()
export class CartsService {

    constructor(private readonly cartsRepository: CartsRepository,
        private readonly userRepository: UserRepository ,
        private readonly productRepository: ProductRepository) { }

    async getCartByUser(idUser) {

        if (!idUser) { return { msg: "Please login before accessing Cart" } }
       const result= await this.cartsRepository.getCartByUser(idUser)
       return result
    }

    async createCarts(body, idUser) {
     console.log(body);
     
        const product= await this.productRepository.getProductDetail(body)

        if (!idUser) { return { msg: "Please login before accessing Cart" } }
        const user= await this.userRepository.getUserWithId(idUser.idUser)
        if(!user) { return { msg: "Please login before accessing Cart" } }
        const productIncartUser = await this.cartsRepository.productIncartUser(idUser, body)
           
        //THIẾU TÌM XEM CÓ SẢN PHẨM KHÔNG 
        if (Number(productIncartUser?.productId) == Number(body.id)) {
            const quantityProduct = Number(productIncartUser?.quantity) + Number(body.quantity)
            const updateQuantityProduct = this.cartsRepository.updateQuantityProduct(quantityProduct, productIncartUser.id)
            return updateQuantityProduct

        } else { 
            return this.cartsRepository.createCarts(body, idUser, product?.[0]?.id, product?.[0]?.name, product?.[0]?.price, product?.[0]?.image?.[0]?.imgSrc  )
        } 
    }

    async changeQuantity(idCart, body) {

        const cart = await this.cartsRepository.getCartByUser(idCart);

        if (!cart) {
            return { msg: "No cart" }
        }
        return await this.cartsRepository.changeQuantity(idCart, body)

    }

    async deleteCart(idCart) {

        const cart = await this.cartsRepository.getCart(idCart)

        if (!cart) {
            return { msg: "No cart" }
        }
        return this.cartsRepository.deleteCart(idCart)
    }

}
