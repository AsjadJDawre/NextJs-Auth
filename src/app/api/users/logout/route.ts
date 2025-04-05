import { NextResponse } from "next/server";
export async function GET() {
    try {
        const options = {
            httpOnly: true,
            expires:new Date(0),
            secure: process.env.NODE_ENV === "production",
        };

        const res = NextResponse.json({message:"logout Successfull",
            success:true
        })
        res.cookies.set("token", "", options);
        res.cookies.set("refreshToken", "", options);
        return res;
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
    
}