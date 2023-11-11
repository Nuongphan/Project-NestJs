import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CsvService } from './csv.service';
import { UploadMiddleware } from '../../middlewares/upload.middleware';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [  new FileTypeValidator({ fileType: '.(csv)' }) ]
})) file) {
    const data = await this.csvService.parseCsv(file);
    console.log("dataaaaa", data); 
    // Handle data as needed
    return { message: 'File uploaded and processed successfully', data };
  }
}
