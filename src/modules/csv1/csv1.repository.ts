import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../products/database/entity/products.entity";
import { Repository } from "typeorm";
import { Images } from "../images/database/entity/images.entity";

@Injectable()
export class Csv1Repository {
    constructor(
        @InjectRepository(Products) private productRepository: Repository<Products>,
        @InjectRepository(Images) private ImagesRepository: Repository<Images>) { }
        async saveDataToDb(results) {
        for (let i = 0; i < results.length; i++) {
            const product = await this.productRepository.save({
                categoryId: results[i].categoryId, price: results[i].price, description: results[i].description,
                name: results[i].name, stock: results[i].stock
            })
            await this.ImagesRepository.save({ productId: product?.id, imgSrc: results[i].image1 })
            await this.ImagesRepository.save({ productId: product?.id, imgSrc: results[i].image2 })
            await this.ImagesRepository.save({ productId: product?.id, imgSrc: results[i].image3 })
        }
    }
}