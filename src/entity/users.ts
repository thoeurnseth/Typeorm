import {Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,} from "typeorm"
import { Profile } from "./Profile"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

}
