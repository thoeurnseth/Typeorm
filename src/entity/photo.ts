import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User1 } from "./user1"

@Entity()
export class Photos {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => User1, (user1) => user1.photos)
    user1: User1
}