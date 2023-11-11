import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repositori';

@Injectable()
export class ProductsService {

    constructor(private readonly productRepo: ProductRepository) { }

    async createProduct(body) {
        const price= body.price
        const product= await this.productRepo.createProduct(body)
        return {product: product, status: 200}
    }

    async deleteProduct(id) {
        const product = await this.productRepo.findProduct(id)
        if (!product) {
            return { msg: "Product not found" }
        }
        return await this.productRepo.deleteProduct(id)
    }

    async getProducts(page) { 
        if(page.page) {
          let pagee= parseInt(page.page)   
          const pageSize= 12
          const totalProduct= await this.productRepo.totalProduct();
          const totalPage= Math.ceil(totalProduct/pageSize)
          const skip= (pagee-1)*pageSize
          if(pagee<0) {
            pagee=1
          }
          return await this.productRepo.getProductWithLimit(skip, pageSize, totalPage)
          
        }
        
        return await this.productRepo.getProducts()
    }

    async updateProduct(id, body) {
        const product = await this.productRepo.findProduct(id)
        if (!product) {
            return { msg: "Product not found" }
        }
        return this.productRepo.updateProduct(id, body)
    }

    async getProductDetail(id) {
        return this.productRepo.getProductDetail(id)
    }

    async getNewarrival() {
        const newarrival= await this.productRepo.getNewArrival()
         const productNewArrival = []
         for( let i=0; i < newarrival.length; i++) {
            const product= await this.productRepo.getProductNewArrival(newarrival[i]?.id)
            productNewArrival.push(product) 
         }    
         return productNewArrival
    }
    

}
