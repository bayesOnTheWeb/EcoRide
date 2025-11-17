import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ride {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    arrival: string

    @Column()
    departure: string

    @Column()
    conducer : string
}
