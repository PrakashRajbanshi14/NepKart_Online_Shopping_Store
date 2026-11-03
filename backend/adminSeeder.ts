import { envConfig } from "./src/config/config"
import User from "./src/database/models/userModel"
import bcrypt from 'bcrypt'

const adminSeeder = async ()=> {
   const [data] = await User.findAll({
        where: {
            email: envConfig.adminEmail
        }
    })

    if(!data){
        await User.create({
        username: envConfig.adminUsername,
        email: envConfig.adminEmail,
        password: bcrypt.hashSync(envConfig.adminPass as string, 8),
        role: "admin"
        })
        console.log("Admin Seeded!");
    }else{
        console.log("Admin Alredy Seeded!");
    }
}

export default adminSeeder