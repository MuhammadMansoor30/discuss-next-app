import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import Profile from "./components/profile";

export default function Home() {
  const handleSignIn = async () => {
    'use server'
    await actions.signIn();
  };

  return (
    <div>
      <Profile />
      {/* <form action={handleSignIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form> */}
    </div>
  );
}

// NOTES (SEC 7):
// Importing Profile a client component to use authtication of next.js.
