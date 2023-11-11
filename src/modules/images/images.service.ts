import { Injectable } from '@nestjs/common';
import { ImagesRepository } from './images.repository';
import { async } from 'rxjs';
import { ProductRepository } from '../products/products.repositori';

@Injectable()
export class ImagesService {

    constructor(private readonly imagesRepository: ImagesRepository, private readonly productRepository: ProductRepository) { }

    async uploadFiles(file, body) {
        const result = await this.imagesRepository.uploadFiles(file, body)
        return result
    }

    async uploadFile(file, idImage) {  
        const image = await this.imagesRepository.getImage(idImage)
        if (!image) {
            return { msg: "Image not found" }
        }
        return await this.imagesRepository.uploadFile(file, idImage)
    }

    async deleteImageProduct(idProduct) {
        const product = await this.productRepository.findProduct(idProduct)
        if (!product) {
            return { msg: "Product not found" }
        }
        return this.imagesRepository.deleteImageProduct(idProduct)
    }

}
