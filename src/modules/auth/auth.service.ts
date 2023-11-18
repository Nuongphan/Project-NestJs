import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UserRepository, private jwtService: JwtService) { }

    async login(body) {
        const user = await this.usersRepository.getUserWithRole(body.email);

        if (user.length == 0) {
            return { msg: "Email or password is not match" }
        } if (user?.[0].status == 1) {
            return { msg: "You need to confirm your email." }
        }
        const passwordValid = await bcrypt.compare(body.password, user[0].password)
        const payloadLocal = { email: user[0].email, roleId: user[0].role.id, firstName: user[0].firstName, lastName: user[0].lastName, status: user[0].status, id: user[0].id  }
        
        if (passwordValid) {
            const payload = { email: user[0].email, roleId: user[0].role.id };
            return {
                access_token: this.jwtService.sign(payload),
                status: 200,
                user: payloadLocal
            }
        } else {
            return { msg: "Password or email is not match" }
        }
    }
    
    async validateUser(details) { 
        let user = await this.usersRepository.getUserWithRole(details.email)
        let tokenUser = await this.jwtService.sign({ email: user?.[0]?.email, roleId: user?.[0]?.role?.id })
        if (user?.length > 0) { return { user, tokenUser } } else {
            console.log('User not found. Creating...');
            const newUser = await this.usersRepository.createUserWithLoginGoogle({ email: details.email, password: Math.floor(Math.random() * 1000000), firstName: details.displayName, lastName: "", status: 2, role: 1, roleId: 1 });
            user = await this.usersRepository.getUserWithRole(newUser.email)
            tokenUser = await this.jwtService.sign({ email: user?.[0]?.email, roleId: user?.[0]?.role?.id })
            return { user, tokenUser };
        }
    }

 

    async findUser(id: number) {
        const user = await this.usersRepository.getUserWithId(id);
        return user;
    }

}