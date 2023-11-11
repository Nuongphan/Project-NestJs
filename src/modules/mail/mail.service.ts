import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(verify) {
    const token = verify.verifyEmail.token
    const userId = verify.user.id
    const url = `http://localhost:8000/users/verify?id=${verify.verifyEmail.id}&token=${token}&userId=${userId}`;
    await this.mailerService.sendMail({
      to: verify.user.email,
      from: 'Normandy Candles',
      subject: 'Welcome to Normandy Candles! Confirm your Email',
      template: './confirmation',
      context: {
        name: verify.user.firstName,
        url,
      },
    });

  }

  async sendUserResetPassword(user, resetpassword) {

    const code = resetpassword.code
    await this.mailerService.sendMail({
      to: user.email,
      from: 'Normandy Candles',
      subject: 'Welcome to Normandy Candles! Reset Password your Email',
      template: './resetpassword',
      context: {
        name: user.firstName,
        code,
      },
    });
  }


  async sendUserOrderConfirmation(user, order) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'Normandy Candles',
      subject: 'Order Confirmation',
      template: './comfirmationOrder',
      context: {
        customerName: user?.firstName,
        orderNumber: user?.firstName,
        orderDate: order.orderDate,
        totalOrderValue: order.totalAmount,
        recipientName: user?.address?.[0]?.name,
        address: user?.address?.[0]?.address,
        contactPhoneNumber: user?.address?.[0]?.phone,
      },
    });
  }

}

