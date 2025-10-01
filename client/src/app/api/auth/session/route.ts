import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const GET = async () =>{
    try {
        const cookieStore = await cookies()
        const res = await fetch("http://localhost:4000/api/v1/auth/me",{
            headers:{
                authorization: cookieStore.get("token")?.value || ""
            }
        });
        const data = await res.json();
        console.log(data);
        return NextResponse.json({...data?.data})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as any)?.message, status:500})
    }
}