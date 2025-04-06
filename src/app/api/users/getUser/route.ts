import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) { 
    try {
        console.log("Incoming request to get user");
        const userId = await getDataFromToken(request);
        console.log("User ID from token:", userId);

        const user = await User.findById(userId).select('-password -isVerified -isAdmin -forgotPasswordToken -refreshToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry');

        if (!user) {
            console.error("User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        console.error("Error in /getUser route:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }  
}
