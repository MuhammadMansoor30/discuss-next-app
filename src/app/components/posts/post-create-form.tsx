'use client';
import { Button, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import FormButton from "../common/form-button";
import { createPost } from "@/actions/create-post";
import { useSession } from "next-auth/react";
import { useActionState } from "react";

interface PostCreateFormProps {
    slug: string
}

export default function PostCreateForm({slug}: PostCreateFormProps){
    const { data: session } = useSession();
    const userId = session?.user.id ?? '';
    const [formState, action] = useActionState(createPost.bind(null, slug, userId), {errors: {}});

    const errorMessage = session ? (
        formState.errors._form ? (
          <div className="p-2 border-red border rounded bg-red-200">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null
    ) : (
        <div className="p-2 border-red border rounded bg-red-200">
          Sign In to Create a New Post
        </div>
    );
    
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create A Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Post</h3>
                        <Input name="title" label="Title" labelPlacement="outside" placeholder="Title"
                            isInvalid={!!formState.errors.title} errorMessage={formState.errors.title?.join(',')}/>
                        <Input name="content" label="Content" labelPlacement="outside" placeholder="Content"
                            isInvalid={!!formState.errors.content} errorMessage={formState.errors.content?.join(',')}/>
                        {errorMessage}
                        <FormButton>Create A Post</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}

// NOTES (SEC 8);
// Creating a PostCraete Form to create posts related to a specific topics.
// Adding the server action to the form and validations so that we can pass only valid data.
// This Form is mostly similar to that of the topics-create-form.tsx form.
// Can use the authetication error hanlding this way as well and the way used in topicsCreateForm as well.
// Now after recieving slug as props we can use interface to assign its type
// Now we will use th ebind method to bing the slug as paramater to the server action function we have created.
// this will give error as we also need to add slug a parameter to our server action.