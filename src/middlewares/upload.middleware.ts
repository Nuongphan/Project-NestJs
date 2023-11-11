import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express/multer';

@Injectable()
export class UploadMiddleware implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './uploadsFile', // Thư mục để lưu trữ file tải lên
    };
  }
}
