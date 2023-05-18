import { json } from "stream/consumers"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Users } from "./entity/users"
import { Profile } from "./entity/Profile"
import { Photos } from "./entity/photo"
import { User1 } from "./entity/user1"
import { Category } from "./entity/Category"
import { Question } from "./entity/Question"

AppDataSource.initialize().then(async () => {

    // insert data to database
    const insert_data = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            { firstName: "Timber", lastName: "Saw",age : 25 },
            { firstName: "Phantom", lastName: "Lancer",age : 25 },
        ])
        .execute()

    // select data from database
    const select_data = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: 1 })
        .getManyAndCount().then(([res,totalCount])=>{
            // const response = JSON.parse(JSON.stringify(res));
            console.log(res);
            console.log(totalCount);
        });
    
    // updata data
    const updata_data = await AppDataSource
        .createQueryBuilder()
        .update(User)
        .set({ firstName: "Mr", lastName: "Seth", age: "24" })
        .where("id = :id", { id: 1 })
        .execute();

    // delete data    
    const delete_data = await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: 10 })
        .execute()

    // save relation between Profile and users    
    const profile = new Profile()
        profile.gender = "male"
        profile.photo = "me.jpg"
        await AppDataSource.manager.save(profile)

    const users = new Users()
        users.name = "Joe Smith"
        users.profile = profile
        await AppDataSource.manager.save(users)
    
    // select joinrelation between Profile and users   
    const select_join = await AppDataSource
        .getRepository(Users)
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.profile", "profile")
        .getMany().then((res)=>{
            const response = JSON.parse(JSON.stringify(res));
            // console.log(response);
            // console.log("res=="+res);
        });   

    // save relation between Photos and User1  one to many
    const photo1 = new Photos()
        photo1.url = "me.jpg"
        await AppDataSource.manager.save(photo1)
        
    const photo2 = new Photos()
        photo2.url = "me-and-bears.jpg"
        await AppDataSource.manager.save(photo2)
        
    const user1 = new User1()
        user1.name = "John"
        user1.photos = [photo1, photo2]
        await AppDataSource.manager.save(user1)    


    // select relation between Photos and User1  one to many
    const select_user = await AppDataSource
        .getRepository(Photos)
        .createQueryBuilder("photos")
        .leftJoinAndSelect("photos.user1", "user1")
        .getMany().then((res)=>{
            // console.log(res);
        });   

    // save relation between Category and Question  many to many
    const category1 = new Category()
        category1.name = "animals"
        await AppDataSource.manager.save(category1)

    const category2 = new Category()
        category2.name = "zoo"
        await AppDataSource.manager.save(category2)

    const question = new Question()
        question.title = "dogs"
        question.text = "who let the dogs out?"
        question.categories = [category1, category2]
        await AppDataSource.manager.save(question)

    // select relation between Photos and User1  many to many
    const questions = await AppDataSource
        .getRepository(Question)
        .createQueryBuilder("question")
        .leftJoinAndSelect("question.categories", "category")
        .getMany().then((res)=>{
            const response = JSON.stringify(res);
            // console.log(response);
        });  




    // const category = await AppDataSource
    //     .getRepository(Category)
    //     .createQueryBuilder("categories")
    //     .leftJoinAndSelect("categories.question", "question")
    //     .getMany().then((res)=>{
    //         console.log(res);
    //     });       

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
