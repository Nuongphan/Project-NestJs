
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { Csv1Repository } from './csv1.repository';

@Injectable()
export class Csv1Service {
  constructor (private readonly csvRepo: Csv1Repository) {}
  async parseCsv(file: Express.Multer.File): Promise<any[]> {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          // Xóa file sau khi đã phân tích xong
          fs.unlinkSync(file.path);
      const result= await  this.csvRepo.saveDataToDb(results);
          resolve(results);
        })
        .on('error', (error) => reject(error));
    });
  }
}
