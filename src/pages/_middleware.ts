import { NextFetchEvent, NextRequest, NextResponse} from "next/server"

import {nanoid} from "nanoid";


export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    if(req.nextUrl.pathname.startsWith("/api/get-url")) {

        console.log("returning from middleware");
        
        return;
    }

    

    const slug = req.nextUrl.pathname.split("/").pop();
     
    console.log(slug)


    const data = await (
        await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json();


    if(data?.url){
        return NextResponse.redirect(data.url);
        }
    



    const random = nanoid();
    const res = NextResponse.next();

    res.cookie("poll-token", random, { sameSite:"strict"});

    return res;


}
