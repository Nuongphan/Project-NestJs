import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
require("dotenv").config()

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['email', 'profile']
    })
  }
  async validate(accessToken: string, refreshToken: string, profile) {
    const payload = {
      email: profile.emails[0].value,
      displayName: profile.displayName,
      accessToken: accessToken
    }
    console.log('Validate');
    return await this.authService.validateUser(payload);


  }
} 