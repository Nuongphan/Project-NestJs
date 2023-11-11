import { Injectable, Param } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class OrdersService {

    constructor(private readonly orderRepo: OrdersRepository, private mailService: MailService,
        private readonly userRepo: UserRepository) { }

    async getAllOrders(page) {
        console.log(page);
        
        if(page.page) {
            let pagee= parseInt(page.page)   
            const pageSize= 12
            const totalOrder= await this.orderRepo.totalOrder();
            const totalPage= Math.ceil(totalOrder/pageSize)
            const skip= (pagee-1)*pageSize
            if(pagee<0) {
              pagee=1
            }
           return  await this.orderRepo.getOrderWithLimit(skip, pageSize, totalPage)
          
          }
        return await this.orderRepo.getAllOrders()
    }

    async getOrderByUserId(userId) {
        return await this.orderRepo.getOrderByUserId(userId)
    }

    async createOrder(userId, body) {

        const addressUserId = await this.orderRepo.findAdressUserId(userId)

        if (addressUserId?.length == 0) {
            return { msg: "Please add an address before creating order" }
        }

        const cartUserId = await this.orderRepo.findCartUserId(userId)

        if (cartUserId?.length == 0) {
            return { msg: "Please add product before creating order" }
        }

        const productInCart = await this.orderRepo.productInCart(userId)
        const totalAmount = productInCart
            .map(item => item.quantity * item.product.price) // Tính giá tiền cho mỗi sản phẩm
            .reduce((acc, curr) => acc + curr, 0)

        // Điều kiện check xem đơn hàng đã có chưua
        let hasCreatedNewOrder = false;
        let orderId;
        let order
        for (const cartProduct of productInCart) {
            const product = cartProduct.product
            const updatedQuantityStock =
                Number(product.stock) - Number(cartProduct.quantity);

            //Tạo đơn hàng nếu chưa có 
            if (hasCreatedNewOrder === false) {
                const newOrder = await this.orderRepo.createNewOrder(totalAmount, userId.userId, addressUserId?.[0].id);
                order = newOrder
                hasCreatedNewOrder = true;
                orderId = newOrder.id; // Gán orderId ở đây, không cần return
            }

            // Cập nhật số lượng tồn kho trong bảng products
            await this.orderRepo.updateProduct(cartProduct?.productId, updatedQuantityStock)

            //  Tạo orderItem
            await this.orderRepo.createOrderItem(cartProduct?.quantity, product?.name, product?.price, product?.id, product?.image?.[0], orderId)

        }
        const user = await this.userRepo.getUserInfor(userId)
        await this.orderRepo.deleteCart(userId)
        const link = await this.mailService.sendUserOrderConfirmation(user, order)
        return { msg: "Created order" }
    }

    //cập nhật status cho order có 5 trạng thái:
    // 1: Chưa thanh toán 
    // 2: Pending, 
    // 3: Processing, 
    // 4: Shipping, 
    // 5: Completed, 
    // 6: Cancelled
    async changeStatus(param, body) {
        const order = await this.orderRepo.getorder(param.id)
        if (!order) {
            return { msg: "order not found" }
        }
        return await this.orderRepo.changeStatus(param.id, body.status)
    }

    async cancelOrder(id) {
        return await this.orderRepo.cancelOrder(id.id)
    }

    async getOrderDetails(id) {
        const order = await this.orderRepo.getorder(id.id)
        if (!order) {
            return { msg: "order not found" }
        }
        return await this.orderRepo.getOrderDetails(id)
    }

    async getBestsellers() {
         const bestsellers= await this.orderRepo.getBestsellers() 
         const productBestsellers = []
         for( let i=0; i < bestsellers.length; i++) {
            const product= await this.orderRepo.getProductBestsellers(bestsellers[i]?.productId)
            productBestsellers.push(product) 
         }    
         return productBestsellers
    }

    async getOrderById(id) {
        return await this.orderRepo.getOrderById(id.id)
    }
    
    async getOrderWithOrderDate() {
        return await this.orderRepo.getOrderWithOrderDate()
    }
}
