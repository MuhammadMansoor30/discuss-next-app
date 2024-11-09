'use client';

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react"

interface ProviderProps{
    children: React.ReactNode,
}

export default function Providers({children}: ProviderProps){
    return (
        <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
    );
};

// NOTES (SEC 7):
// Creating a provider component to pass the state of UI to entire application.
// In Next js we use this approach to pass the state of something to the entire application.
// In React js we use the context api and hooks to achieve similar behavior.