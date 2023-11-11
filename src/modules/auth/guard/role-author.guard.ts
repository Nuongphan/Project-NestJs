import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Requestt } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {

        try {
            const request = context.switchToHttp().getRequest<Requestt>();
            const roleNum = request.user.roleId

            if (roleNum === 2) {
                return true

            } else if (!roleNum) {
                return false

            }
        } catch (error) {

        }
    }
}