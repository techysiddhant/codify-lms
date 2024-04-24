import Env from "@/lib/env";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import {GoogleProfile} from 'next-auth/providers/google';

export const options:NextAuthOptions = {
    providers:[
        GoogleProvider({
            profile(profile:GoogleProfile){
                console.log("FROM-PROFILE",profile);
                return {
                    ...profile,
                    role:profile.role ?? "USER",
                    id:profile.id
                }
            },
            clientId:Env.GOOGLE_CLIENT_ID!,
            clientSecret:Env.GOOGLE_CLIENT_SECRET!
        })
    ],
    // callbacks:{
    //     async signIn({user,account,profile}){

    //     }
    // }
}