import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/modules/images/cloudinary-response';
import { Images } from './database/entity/images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../products/database/entity/products.entity';
const streamifier = require('streamifier');

@Injectable()
export class ImagesRepository {

    constructor(@InjectRepository(Images) private imagesRepository: Repository<Images>) { }

    uploadFiles(file: Express.Multer.File[], body): Promise<CloudinaryResponse[]> {

        return new Promise<CloudinaryResponse[]>((resolve, reject) => {
            const uploadPromises: Promise<CloudinaryResponse>[] = [];

            for (let i = 0; i < file.length; i++) {

                const uploadPromise: Promise<CloudinaryResponse> = new Promise((innerResolve, innerReject) => {
                    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {

                        if (error) { innerReject(error) }
                        else {
                            this.imagesRepository.save({ imgSrc: result.secure_url, productId: body.productId }).then(savedImage => {
                                innerResolve(result);
                            }).catch(saveError => { 
                                innerReject(saveError);
                            });
                        }
                    });

                    streamifier.createReadStream(file[i].buffer).pipe(uploadStream);

                });
                uploadPromises.push(uploadPromise);

            }

            Promise.all(uploadPromises)
                .then((results: CloudinaryResponse[]) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async getImage(id) {
        return await this.imagesRepository.findOne({ where: { id: id } })
    }

    async uploadFile(file: Express.Multer.File, idImage): Promise<CloudinaryResponse> {

        return new Promise<CloudinaryResponse>((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    
                    if (error) return reject(error);

                    this.imagesRepository.update(idImage, { imgSrc: result.secure_url })
                    resolve(result);
                },
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);

        });  
    }   

    async deleteImageProduct(idProduct) {
        return await this.imagesRepository.delete({ productId: idProduct.idProduct })
    }
}
