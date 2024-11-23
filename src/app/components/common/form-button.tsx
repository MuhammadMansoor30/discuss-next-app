'use client';
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FromButtonProps{
    children: React.ReactNode
}

const FormButton = ({children}: FromButtonProps) =>{
    const {pending} = useFormStatus();

    return (
        <Button type="submit" isLoading={pending} >{children}</Button>
    )
}

export default FormButton;

// NOTES (SEC 8):
// The useFormStatus hook is used to retireve the status of our form element like pending, completed etc.
// This is so we can show some text or component like Loading Spinner to user to enhance user experience.
// But this useFormStatus hook cannoe be direlcty used inside of the parent component that includes the form.
// Instead we have to use it inside of a child component which is then called inside of the parent component to make it work.
// Like in this case the button isode of the create-topic form will be converted to the formButton component with useFormStatus hook and then called as child component insode of the CreateTopic component.