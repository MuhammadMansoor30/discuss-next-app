'use server';
import type { Post } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/path";

interface CreatePostFormState{
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[]
    }
}

const createPostSchmea = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export async function createPost(slug: string, userId: string, formState: CreatePostFormState, 
    formData: FormData): Promise<CreatePostFormState>{
    const result = createPostSchmea.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const topic = await db.topic.findFirst({
        where: {slug}
    });

    if(!topic){
        return {
            errors: {
                _form : ["Cannot find topic "]
            }
        }
    }

    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                topicId: topic.id,
                userId: userId,
            }    
        });
    } 
    catch (err: unknown) {
        if(err instanceof Error){
            return {
                errors: {
                    _form: [err.message]
                }
            }
        }
        else{
            return {
                errors: {
                    _form: ["Something went Wrong"]
                }
            }
        }
        
    }
    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));

}

// Notes (SEC 8):
// Creating the server action for the craete post page.
// The functionality is similar to that of the create-topics.ts action file.
// More info about different things is mentioned there.
// Passing in the slug as parameter to allow the server action to check the data based on it and also bing it to use slug.
// We will use this slug to find record from db and only if found we will create a new post related to that topic.
// Similary we will also pass in the userId from postCreateFrom since we cannot direclty invoke auth session from server actions.