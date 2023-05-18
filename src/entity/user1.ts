import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Photos } from "./photo"

@Entity()
export class User1 {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Photos, (photos) => photos.user1)
    photos: Photos[]
}