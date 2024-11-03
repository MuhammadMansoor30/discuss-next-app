import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error("Missing Github oauth credentials");
}

export const {handlers: {GET, POST}, auth, signOut, signIn} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // Usually not needed, we are adding it here to fix a bug of the nextAuth that it doesnt set the id value for user.
        async session({session, user}: any){
            if(session && user){
                session.user.id = user.id;
            }
            return session;
        }
    }

});

// NOTES (SEC 7):
// Creating auth.ts files to add the authetication configurations for our application.
// For this we have used github OAuth.
// We first have created our application on github by visiting link: githib/settings/application/new
// Got the client id and client secrte id and auth secret id is provided by us as a random inside of .env.local file.
// Imported items from the installed libraries and used them fro auth setup.
// NextAuth() function takes object as args and returns an object with hanlders of Get, Post for github Oauth, return auth to tell if user if authtiucated or not, and returns 2 functions of signOut and signIn used for signing in and out of app.