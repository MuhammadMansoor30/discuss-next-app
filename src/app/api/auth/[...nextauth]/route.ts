import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error("Missing Github oauth credentials");
}

const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session, user }: any) {
            if (session && user) {
                session.user.id = user.id;
            }
            return session;
        }
    }
};

const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST};

// NOTES (SEC 7):
// Creating auth.ts (now router.ts) files to add the authetication configurations for our application.
// For this we have used github OAuth.
// We first have created our application on github by visiting link: githib/settings/application/new
// Got the client id and client secrte id and auth secret id is provided by us as a random inside of .env.local file.
// Imported items from the installed libraries and used them fro auth setup.
// NextAuth() function takes object as args and returns an object with hanlders of Get, Post for github Oauth, return auth to tell if user if authtiucated or not, and returns 2 functions of signOut and signIn used for signing in and out of app.
// In newer versions of Next Js we dont need to add specify then instead we can just default export nextAuth and authOptions.

// The route.ts file inside of out app directory is a special file used for providing event hanlders like Get Post ot others.
// We can create these handler function byy overself or export using any external library if installed.
// By default we dont need these event handlers to interact with our own server as that is done by using the server actions.
// These event handlers are required to use by the external servers to interact with our application.
// In our case the github server is the external user which will interact with our application for authtication purposes.
// In newer versions we have to configure file using the given proivded above.

// OLD VERSION CODE:   // Code for old auth.ts file now route.ts
// export const {handlers: {GET, POST}, auth, signOut, signIn} = NextAuth({    // Done in Older versions
//     adapter: PrismaAdapter(db),
//     providers: [
//         Github({
//             clientId: GITHUB_CLIENT_ID,
//             clientSecret: GITHUB_CLIENT_SECRET,
//         })
//     ],
//     callbacks: {
//         // Usually not needed, we are adding it here to fix a bug of the nextAuth that it doesnt set the id value for user.
//         async session({session, user}: any){
//             if(session && user){
//                 session.user.id = user.id;
//             }
//             return session;
//         }
//     }
// });

// export {GET, POST} from "@/auth";   // Code for old router.tsx file