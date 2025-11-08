import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({length : 50})
    firstname : string

    @Column({length : 50})
    lastname : string

    @Column({unique : true})
    email : string

    @Column()
    password : string 

    @Column({default : false})
    isAdmin : boolean
}
