import "reflect-metadata"
import { DataSource } from "typeorm"
// import { Photo } from "./entity/photo"
import { Profile } from "./entity/Profile"
import { User } from "./entity/User"
import { Users } from "./entity/users"
import { User1 } from "./entity/user1"
import { Photos } from "./entity/photo"
import { Question } from "./entity/Question"
import { Category } from "./entity/Category"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "typeorm_db",
    synchronize: true,
    logging: false,
    entities: [User,Users,Profile,User1,Photos,Question,Category],
    migrations: [],
    subscribers: [],
})
