import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./database/entity/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepository {

    constructor(@InjectRepository(Products) private productsRepository: Repository<Products>) { }

    async createProduct(body) {
        return await this.productsRepository.save(body);
    }

    async findProduct(id) {
        return await this.productsRepository.findOne({where: {id: id.id}});
    }

    async deleteProduct(id) {
        return await this.productsRepository.delete(id.id);
    }

    async getProducts() {
        return await this.productsRepository.find({
            relations: ['image', 'category'], 
        })
    }

    async updateProduct(id,body) {
        return await this.productsRepository.update(id.id, {stock: body.stock, name: body.name, price: body.price, description: body.description, categoryId: body.category})
    }

    async getProductDetail(id) {
        return await this.productsRepository.find({where: {id: id.id},
        relations: ['category', 'image']})
    }

    async getProductNewArrival(id) {
        return await this.productsRepository.find({where: {id: id},
            relations: ['category', 'image']})
    }

    async getProductWithLimit(skip, pageSize,totalPage) {  
        const result= await this.productsRepository.find({ relations: ['image', 'category'],skip: skip, take: pageSize, })
        return {result, totalPage}
    }
    
    async totalProduct() {
        return this.productsRepository.count()
    }
    async getNewArrival() {
       const result= await this.productsRepository
        .createQueryBuilder('products')
        .orderBy('products.id', 'DESC')
        .limit(10)
        .getMany();
        
        return result
    }
    

   
}