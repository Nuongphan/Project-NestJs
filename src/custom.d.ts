import { Request } from 'express';
import { UserRequest } from './type/request';

@Injectable()
declare module 'express' {

  interface Requestt {
    user?: UserRequest; // Thêm thuộc tính user vào Request
  }
  
}
