'use server';

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export async function signIn() {
    return nextAuthSignIn("github");
}

export async function signOut() {
    return nextAuthSignOut();
}




// NOTES (SEC 7):
// Creating server actions here and using the auth.ts file exported methods of signIn and signOut to allow authtication using Github.
// Using the signIn and signOut as nextAuthSignIn and SignOut from next-auth/next because signIn and signOur are not directly available as functions in auth library.


// OLD VERSION CODE:
// 'use server';

// import * as auth from "@/auth";

// export async function signIn() {
//     return auth.signIn('github');
// }

// export async function signOut() {
//     return auth.signOut();
// }
