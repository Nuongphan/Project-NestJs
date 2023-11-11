import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('verifyemail')
export class VerifyEmail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    userId: number ;

} 