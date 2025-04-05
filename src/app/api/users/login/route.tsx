import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connect();

const generateAccessTokenAndRefreshToken = async (user: any) => {
    try {
        const RefreshToken = user.generateRefreshToken();
        const AccessToken = user.generateAccessToken();
        user.refreshToken = RefreshToken;
        await user.save({ validateBeforeSave: false });
        return { AccessToken, RefreshToken };
    } catch (error) {
        console.log("Something went wrong while Generating Tokens", error);
        throw error;
    }
};

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        if (!email || !password) {
            return NextResponse.json(
                { error: "Please fill all the fields" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User Does not Exist!" },
                { status: 400 }
            );
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Incorrect Password!" },
                { status: 400 }
            );
        }

        const { AccessToken, RefreshToken } = await generateAccessTokenAndRefreshToken(user);
        
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        const response = NextResponse.json(
            {
                message: "Login Successful",
                success: true,
                // user: {
                //     id: user._id,
                //     email: user.email,
                //     username: user.username
                // }
                status: 200
            },
            // { status: 200 }
        );

        response.cookies.set("token", AccessToken, options);
        response.cookies.set("refreshToken", RefreshToken, options);

        return response;

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}