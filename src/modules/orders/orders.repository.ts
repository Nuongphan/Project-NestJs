import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './database/entity/order.entity';
import { Repository } from 'typeorm';
import { Address } from '../addresses/database/entity/addresses.entity';
import { Cart } from '../carts/database/entity/carts.entity';
import { Products } from '../products/database/entity/products.entity';
import { OrderItem } from '../order-item/database/entity/order-item.entity';

@Injectable()
export class OrdersRepository {

    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Address) private dddressRepository: Repository<Address>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) { }
     
    async getAllOrders() {
        return this.orderRepository.find()
    }

    async getProductBestsellers(id) {
        return await this.productsRepository.find({
            relations: ['image', 'category'], 
            where: {id: id}
        })
    }

    async getOrderByUserId(userId) {
        return this.orderRepository.findBy({ userId: userId.userId })
    }

    async productInCart(userId) {
        const idUser = userId.userId
        const result = await this.cartRepository
            .createQueryBuilder('cart')
            .innerJoinAndSelect('cart.product', 'product')
            .innerJoinAndSelect('product.image', 'image')
            .where('cart.userId = :userId', { userId: idUser })
            .getMany();
        return result
    }

    async createNewOrder(totalAmount, userId, addressUserId) {
       return  await this.orderRepository.save({ userId: userId, totalAmount: totalAmount, addressId: addressUserId, shippingFee: 25000, orderDate: new Date() })
    }

    async updateProduct(productId, updatedQuantityStock) {
        await this.productsRepository.update(productId, { stock: updatedQuantityStock })
    }

    async findAdressUserId(userId) {
        return await this.dddressRepository.findBy({ userId: userId.userId })
    }

    async findCartUserId(userId) {
        return await this.cartRepository.findBy({ userId: userId.userId })
    }

    async createOrderItem(quantityy, name, price, id, image ,orderId) {
        const thumnail= image.imgSrc
        const result= await this.orderItemRepository.save({quantity:quantityy,productName: name, price: price, orderId: orderId, productId:id, thumnail:thumnail})
       
    }

    async deleteCart(userId) {
      return   await this.cartRepository.delete({userId: userId.userId})
    } 

    async getorder(param) {
        return await this.orderRepository.findOne({where: {id: param}})
    } 

    async changeStatus(param, body) {
        return await this.orderRepository.update(param, {status:body})
    }

    async cancelOrder(id) {
        return await this.orderRepository.update(id, {status: "Cancelled"})
    }
    
    async getOrderDetails(id) {
        const orderDetails = await this.orderItemRepository.find({where: {orderId: id.id}})
        return orderDetails
    }

    async getBestsellers() {
        return await this.orderItemRepository
        .createQueryBuilder('orderitems')
        .select('orderitems.productId', 'productId')
        .addSelect('SUM(orderitems.quantity)', 'quantity')
        .groupBy('orderitems.productId')
        .orderBy('SUM(orderitems.quantity)', 'DESC')
        .limit(10)
        .getRawMany();
    }

    async totalOrder() {
        return this.orderRepository.count()
    }

    async getOrderWithLimit(skip, pageSize, totalPage) {
        const result= await this.orderRepository.find({ skip: skip, take: pageSize, })
        return {result, totalPage}
    }

    async getOrderById(id) {
        return this.orderRepository.findOne({where: {id: id}})
    }

    async getOrderWithOrderDate() {
        return this.orderRepository
        .createQueryBuilder("orders")
        .orderBy("orders.orderDate", "DESC")
        .getMany();
    }
}
