'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function Profile() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {JSON.stringify(session.user)} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      {/* <Button onClick={() => signIn()}>Sign in</Button> */}
      <Button onClick={() => signIn('github')}>Sign in</Button>
      {/* SignIn using Github directly */}
    </>
  );
}


// NOTES (SEC 7):

// In the newer versions of nextjs the auth can only work in client components so we have to use client components to work with authetication.
// Here we have created simple componetn to use signIn and signout of anuth js.
// We can use multiple auth handlers like google, github, facebook, etc and all those which we have defined in out route.ts file inside of api/auth/[...nextauth] folder.
