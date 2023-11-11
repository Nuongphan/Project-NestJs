import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ChangeAddressDTO {

    @MaxLength(50, { message: 'Name is too long', })
    @IsString()
    @IsNotEmpty({ message: 'Field cannot be empty' })
    name: string

    @IsString()
    @IsNotEmpty({ message: 'Field cannot be empty' })
    address: string;
    
    @IsNotEmpty({ message: 'Field cannot be empty' })
    phone: string

}
