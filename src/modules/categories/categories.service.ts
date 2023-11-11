import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repositori';

@Injectable()
export class CategoriesService {

    constructor(private readonly categoriRepo: CategoryRepository) { }

    async createCategory(body) {
        return await this.categoriRepo.createCategory(body)
    }
    
}
