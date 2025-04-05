import {connect} from "@/dbConfig/dbConfig.ts"
import User from "@/models/user.ts"
import bcryptjs from "bcryptjs"
import{NextResponse,NextRequest} from "next/server"
connect()



export async function POST(request:NextRequest){
    try {
       const reqBody= await request.json()
       const {name,email,password}=await reqBody
       console.log(reqBody)

       // checking if we get all the inputs
       if(!name || !email || !password){
        return NextResponse.json({error:"Please fill all the fields"},{status:400})
       }

       // is User exists already
       const user=await User.findOne({email})
       if(user){
        return NextResponse.json({error:"User already exists"},{status:400})
       }

       // hash password
       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password,salt)

     const newUser =   new User({
        username :name ,
        email,
        password:hashedPassword
       })

       const savedUser = await newUser.save()

       console.log("User Created successfully",savedUser)
       return NextResponse.json({
        message : "User Created Successfully",
        status : 200,
       
       })
       }

        
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}