'user server';

import * as auth from "@/auth";

export async function signIn(){
    return auth.signIn('github');
}

export async function signOut(){
    return auth.signOut();
}


// NOTES (SEC 7):
// Creating server actions here and using the auth.ts file exported methods of signIn and signOut to allow authtication using Github.