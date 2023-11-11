// csv.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class CsvService {
  async parseCsv(file: Express.Multer.File): Promise<any[]> {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          // Xóa file sau khi đã phân tích xong
          fs.unlinkSync(file.path);
          
          resolve(results);
        })
        .on('error', (error) => reject(error));
    });
  }
}
