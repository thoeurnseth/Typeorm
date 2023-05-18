import { Entity, PrimaryGeneratedColumn, Column ,OneToOne  } from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gender: string  

    @Column()
    photo: string
}
