import { Users } from 'src/modules/users/database/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('roles')
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: number;

    @OneToMany(() => Users, (user)=> user.role, {cascade: true} )
    user: Users[]
    
}