import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./database/entity/categories.entity";
import { Repository } from "typeorm";

Injectable()
export class CategoryRepository {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async createCategory(body) {
        return this.categoryRepository.save(body);
    }
    
}