import { Controller, Post, Body, Get, UseGuards, Req, Res, Redirect } from '@nestjs/common'; 
import { AuthService } from './auth.service';
import { LoginUserDTO } from '../users/dto/login-users.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guard/googleAuth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    handleLogin() {
      return { msg: 'Google Authentication' };
    }                                

    @Get('/google/callback')
    @UseGuards(AuthGuard('google') )
    handleRedirect(@Req() request, @Res() response) {
      request.headers['Authorization'] = `Bearer ${request.user.tokenUser}`; 
    return response.redirect(`http://localhost:3000/auth/logingoogle/${request.user.tokenUser}/${JSON.stringify(request.user.user[0].id)}/${JSON.stringify(request.user.user[0].status)}/${JSON.stringify(request.user.user[0].firstName)}/${JSON.stringify(request.user.user[0].lastName)}`)
    }

  
  
    
    @Post()
    async login(@Body() body: LoginUserDTO) {
        return this.authService.login(body);
    }
}