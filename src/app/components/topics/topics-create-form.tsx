'use client';
import { Input, Button, Textarea, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { createTopic } from "@/actions/create-topic";
import { useSession } from "next-auth/react";
import { useActionState } from "react";
import FormButton from "../common/form-button";

const TopicsCreateForm = () => {
    const { data: session } = useSession();
    const [formState, action] = useActionState(createTopic, {errors: {}});

    if(session){
        return (
            <Popover placement="left">
                <PopoverTrigger>
                    <Button color="primary">Create a Topic</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <form action={action}>
                        <div className="flex flex-col gap-4 w-80 p-4">
                            <h3 className="text-lg">Create a topic</h3>
                            <Input name="name" label="Name" labelPlacement="outside" placeholder="Name" 
                                isInvalid={!!formState.errors.name} errorMessage={formState.errors.name?.join(', ')}/>
                            <Textarea name="description" label="Description" labelPlacement="outside" placeholder="Describe your Topic" isInvalid={!!formState.errors.description} errorMessage={formState.errors.description?.join(', ')}/>
                            {
                                formState.errors._form ? (<div className="p-2 bg-red-200 border border-red rounded">
                                    {formState.errors._form?.join(', ')}
                                </div>) : null
                            }
                            <FormButton>Submit</FormButton>
                        </div>
                    </form>
                </PopoverContent>
            </Popover>
        )
    }
    else{
        return (
            <Popover placement="left">
                <PopoverTrigger>
                    <Button color="primary">Create a Topic</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="m-5 p-2 bg-red-200 border border-red rounded">
                        You Must be Sign In to Do this.
                    </div>
                </PopoverContent>
            </Popover>
        )
    }
}

export default TopicsCreateForm;

// NOTES (SEC 7):
// Creating the TopicsCreateForm to handle the topic create logic.
// This form is created using the nextUi library.
// We have linked our createTopics action to it as well.
// We will use the useFormState hook to access the form state of our application from our server action to the forntend.
// More about formState hook is mentioned in "snippets-nest-app".
// Here the formState hook will firslty give error which will be unclear.
// This error is all about the typescript type structure.
// The useFormState hook wants us to provide with the specific type which is beign retured by the server action or used by the server action as the 2nd argument which is passed to the server action as formState.
// If the type matches the error goes away else it will be there.  (!! is used to turn the value into boolean)
// Using useActionState instead of useFormSatet as it is beign depricated and both ahve same behavior.