'use server';
import { z } from "zod";
import { Topic } from "@prisma/client";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "@/path";

interface CreateTopicsFormState{
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[]; // Adding this to hanlde database related errors like not sign in or cannot add data etc.
    }   // Creating an error object with name and desc proeprties. '?' means that these properties are optional
}; 

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, {message: "Name must be lowercase and can contain only dashes without spaces"}),
    description: z.string().min(10)
});   // Creating zod schema object for adding validations.

export async function createTopic(formState: CreateTopicsFormState, formData: FormData): Promise<CreateTopicsFormState>{
    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
    });

    if(!result.success){
        // console.log(result.error);   // Returns an error object if validations fails
        return {
            errors: result.error.flatten().fieldErrors   // Returns error object which is easy to read
        }
    }

    let topics: Topic;
    try {
        topics = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        });
    } 
    catch (error: unknown) {
        if(error instanceof Error){
            return {
                errors: {
                    _form: [error.message]
                }
            }
        }
        else{
            return{
                errors: {
                    _form: ["Something went wrong"]
                }
            }
        }
    }

    revalidatePath('/');   // Revalidatng or re-rendering the static home page path
    redirect(path.topicShow(topics.slug)); 
}

// NOTES (SEC 7):
// Creating the create-topic file to write the server action functions to add the create topic logic.
// Installing "zod" library and importing it in the app for applying the validations to our textfields.
// Using zod we can simplify the process of applying the validations.
// For using zod firstly we have to create a schema object that holds all the values we want to validate.
// Then we have to apply the validations and call the "safeParse()" function of the zod schema defined.
// Afterwards we can check if we have a successful result or have errors in it.
// Adding the formState property to access the data from the frontend using the useFormState hook.
// Adding the return type for function to allign it with out formState object and useFormState hook requirements.
// The return type is Promise beacuse it is an async function and we will return our newly created error object.