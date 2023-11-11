import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('resetemail')
export class ResetEmail {

    @PrimaryGeneratedColumn()
    id: number;   

    @Column()
    code: string;

    @Column()
    userId: number
    
} 