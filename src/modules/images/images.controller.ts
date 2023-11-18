import { Body, Controller, Delete, FileTypeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {

    constructor(private readonly imageService: ImagesService) { }

    @Post()
    @UseInterceptors(FilesInterceptor('file', 3))  
    async uploadImages(@UploadedFiles(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' })
        ]
    })) file: Express.Multer.File[], @Body() body) {  
        return await this.imageService.uploadFiles(file, body);
    }

    @Put("/:idImage")
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(new ParseFilePipe({
        validators: [  new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }) ]
    })) file: Express.Multer.File, @Param("idImage") idImage) {
        
        return await this.imageService.uploadFile(file, idImage)
    }

    @Delete("/product/:idProduct")
    deleteImageProduct(@Param() idProduct) {
     return this.imageService.deleteImageProduct(idProduct)
    }

} 
