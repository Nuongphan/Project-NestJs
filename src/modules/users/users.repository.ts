import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './database/entity/users.entity';
import { Repository } from 'typeorm';
import { Roles } from '../roles/database/entity/roles.entity';
import { Address } from '../addresses/database/entity/addresses.entity';
import { VerifyEmail } from '../verifyemail/database/entity/verifyEmail.entity';
import * as crypto from 'crypto';
import { ResetEmail } from '../reset-password/database/entity/resetpassword.entity';

@Injectable()
export class UserRepository {

    constructor(@InjectRepository(Users) private userRepository: Repository<Users>,
        @InjectRepository(Roles) private roleRepository: Repository<Roles>,
        @InjectRepository(Address) private addressRepository: Repository<Address>,
        @InjectRepository(VerifyEmail) private verifyEmailRepository: Repository<VerifyEmail>,
        @InjectRepository(ResetEmail) private resetemailRepository: Repository<ResetEmail>) { }


    async getRole() {
        return this.roleRepository.findOne({ where: { role: 1 } })
    }

    async getUser(email) {
        const user = await this.userRepository.findOne({ where: { email: email } })
        return user
    }

    async getUserWithRole(email) {
        const user = await this.userRepository.find({
            relations: ['role'], // Khi truy vấn, lấy thông tin của cả bảng User và bảng Group thông qua quan hệ @ManyToOne
            where: { email: email }
        })
        return user
    }

    async register(body) {
        const { firstName, lastName, newPassword, email, roleRegister } = body
        const user = await this.userRepository.save({
            roleId: roleRegister, firstName: firstName, lastName: lastName, password: newPassword, email: email
        })
        const length = 10
        const randomBytes = crypto.randomBytes(length);
        // Chuyển buffer thành chuỗi hex
        const randomString = randomBytes.toString("hex");
        const verifyEmail = await this.verifyEmailRepository.save({ userId: user.id, token: randomString })
        return { user, verifyEmail }
    }

    async getUsers() {
        return await this.userRepository.find()
    }

    async getUserWithId(id) {
        return await this.userRepository.findOne({ where: { id: id } })
    }

    async changeStatusUser(user) {
        return await this.userRepository.save(user)
    }

    async getUserInfor(id) {
        return await this.userRepository.findOne({
            relations: ['address'], // Khi truy vấn, lấy thông tin của cả bảng User và bảng Group thông qua quan hệ @ManyToOne
            where: { id: id.id }
        })
    }

    async createAddress(address: { name: any; phone: any; address: any; user: any; province:any; district:any; ward:any; }) {
        return await this.addressRepository.save(address)
    }

    async changeAddress(idUser, idAddress, body) {
        return await this.addressRepository.update(idAddress, { name: body.name, address: body.address, province:body.province, district: body.district, ward: body.ward,  phone: body.phone, userId: idUser })
    }

    async getTokenDatabase(id) {
        return await this.verifyEmailRepository.findOne({ where: { id: id } })
    }

    async verifyEmail(user) {
        return await this.userRepository.save(user)
    }

    async sendForgotpassword(user, randomString) {
       const result= await this.resetemailRepository.save({ userId: user.id, code: randomString })
       const deletee = await this.resetemailRepository.delete({ userId: user.id})
       return result
    }

    async sendResetpassword(codeRessetDatabase, newPassword) {
        const id = codeRessetDatabase.userId
        return await this.userRepository.update(id, { password: newPassword })
    }

    async getCodeReset(code) {
        return await this.resetemailRepository.findOne({ where: { code: code } })
    }

    async createUserWithLoginGoogle(details) {  
        const length = 10
        const randomBytes = crypto.randomBytes(length);
        const randomString = randomBytes.toString("hex");
        const id= Math.floor(Math.random()*1000000)
        return await this.userRepository.save({id:id,roleId:1, email: details.email, status: 2, firstName: details.firstName, lastName: "",password:randomString })
    }

    async getUsersWWithLimit(skip, pageSize) {
        return await this.userRepository.find({skip:skip, take:pageSize})
    }

    async totalUsers() {
        return this.userRepository.count()
    }

    async getUsersWithLimit(skip, pageSize,totalPage) {  
        const result= await this.userRepository.find({ skip: skip, take: pageSize, })
        return {result, totalPage}
    }
    
}