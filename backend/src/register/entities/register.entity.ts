import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Register {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    firstname : string

    @Column()
    lastname : string

    @Column()
    password : string 

    @Column({unique : true})
    email : string


}
