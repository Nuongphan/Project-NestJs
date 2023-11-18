import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Csv1Service } from './csv1.service';



@Controller('csv')
export class Csv1Controller {
  constructor(private readonly csvService: Csv1Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [new FileTypeValidator({ fileType: '.(csv)'})]})) file) {  
    const data = await this.csvService.parseCsv(file);
    // Handle data as needed
    return { message: 'File uploaded and processed successfully', data };
  }
}

