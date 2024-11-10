'use client';
import Link from "next/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Button, Avatar, Popover, PopoverContent, PopoverTrigger}
from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header(){
    const { data: session } = useSession();
    let authContent: React.ReactNode;
    if(session){
        authContent = (
            <Popover placement="left">
                <PopoverTrigger>
                    <Avatar src={session.user?.image || ''}/>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4">
                        <Button type="submit" onClick={() => signOut()}>Sign Out</Button>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
    else{
        authContent = (
        <>
            <NavbarItem>
                <Button type="submit" color="secondary" variant="bordered" onClick={() => signIn('github')}>Sign In</Button>
            </NavbarItem>
            <NavbarItem>
                <Button type="submit" color="primary" variant="flat" onClick={() => signIn('github')}>Sign Up</Button>
            </NavbarItem>
        </>
        );
    }

    return(
        <Navbar className="shadow mb-2">
            <NavbarBrand>
                <Link href='/' className="font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <Input />
            </NavbarContent>
            <NavbarContent justify="end">
                {authContent}
            </NavbarContent>
        </Navbar>
    );
}

// NOTES (SEC 7):
// Creating the Header component using the nextui library to create the header component for our app.
// We have used the next ui library along with tailwind to style this component.
// Using the authContent to separte out the signin/signup and user image jsx to make the component look less cluttered and easy to read.