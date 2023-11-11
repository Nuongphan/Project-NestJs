import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

    constructor(private userRepo: UserRepository, private mailService: MailService) { }

    async register(body) {
        const { firstName, lastName, password, repeatpassword, email, role } = body
        const roleUser = await this.userRepo.getRole()
        const roleIdd = roleUser.id
        const roleRegister = role ? role : roleIdd
        const user = await this.userRepo.getUser(email)
        if (user) {
            return { msg: " User already", type: "email" }
        }
        if (password == repeatpassword) {
            const salt = 10
            const genSalt = await bcrypt.genSalt(salt)
            const newPassword = await bcrypt.hash(password, genSalt)
            const newUser = await this.userRepo.register({ firstName, lastName, newPassword, email, roleRegister })
            const link = await this.mailService.sendUserConfirmation(newUser)
            return { newUser, link, status: 200 }
        } else {
            return { msg: "Repeatpassword is not matching password", type: "password" }
        }
    }

    async getUsers(page) {

        if(page.page) {
            let pagee= parseInt(page.page)   
            const pageSize= 12
            const totalUsers= await this.userRepo.totalUsers();
            const totalPage= Math.ceil(totalUsers/pageSize)
            const skip= (pagee-1)*pageSize
            if(pagee<0) {
              pagee=1
            }
            return await this.userRepo.getUsersWithLimit(skip, pageSize, totalPage)
            
          }
          
        return await this.userRepo.getUsers()
    }

    async changeStatusUser(id) {
        const user = await this.userRepo.getUserWithId(id.id)
        if (!user) {
            return { msg: "user not found" }
        } else {
            user.status = user.status === 2 ? 3 : 2;
            return this.userRepo.changeStatusUser(user)
        }
    }

    async getUserInfor(id) {
        const user = await this.userRepo.getUserWithId(id.id)
        if (!user) {
            return { msg: "user not found" }
        } else {
            return await this.userRepo.getUserInfor(id)
        }
    }

    async createAddress(id: any, body: any) {
        const user = await this.userRepo.getUserWithId(id.id)
        if (!user) {
            return { msg: "user not found" }
        } else {
            const address = { name: body.name, phone: body.phone, address: body.address, province:body.province, district:body.district,ward:body.ward, userId: id.id, user: id.id }
            return await this.userRepo.createAddress(address)
        }
    } 

    async changeAddress(idUser, idAddress, body) {
        const user = await this.userRepo.getUserWithId(idUser)
        if (!user) {
            return { msg: "user not found" }
        }
        else { return await this.userRepo.changeAddress(idUser, idAddress, body) }

    }

    async verifyEmail(token, userId, id) {
        const tokenDatabase = await this.userRepo.getTokenDatabase(id)
        const user = await this.userRepo.getUserWithId(userId)
        if (!tokenDatabase) {
            return { msg: "Token database not found" }
        } else {
            if (tokenDatabase.userId == userId && tokenDatabase.token == token) {
                user.status = 2
                return await this.userRepo.verifyEmail(user)
            }
        }

    }

    async sendForgotpassword(body) {
        const user = await this.userRepo.getUser(body.email)
        if (!user) {
            return { msg: "user not found", status: 401 }
        } else {
            const length = 10
            const randomBytes = crypto.randomBytes(length);
            const randomString = randomBytes.toString("hex");
            const resetpassword = await this.userRepo.sendForgotpassword(user, randomString)
            const link = await this.mailService.sendUserResetPassword(user, resetpassword)
            return { msg: "success", status: 200 }
        }
    }

    async sendResetpassword(body) {
        const codeRessetDatabase = await this.userRepo.getCodeReset(body.code)
        const salt = 10
        const genSalt = await bcrypt.genSalt(salt)
        const newPassword = await bcrypt.hash(body.password, genSalt)
        if (!codeRessetDatabase) {
            return { msg: "Code reset failed", status: 400 }
        } else {
            return await this.userRepo.sendResetpassword(codeRessetDatabase, newPassword)
        }

    }
}

