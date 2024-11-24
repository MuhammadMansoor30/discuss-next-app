import type { Post } from "@prisma/client";
import { db } from "..";

export type PostWithData = Post & {
    topic: {slug : string};
    user: {name: string | null};
    _count: {comments: number};
}; // Here specifying that get the Post type and then add some fields to it as provided

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]>{
    return db.post.findMany({
        where: {topic: {slug}},
        include: {
            topic: {select: {slug: true}},
            user: {select: {name: true}},
            _count: {select: {comments: true}}
        }
    });
}

// Another Way to Define custom Type For this we dont need to specify the return type with function.
// Instead the defined type will automatically check for the function returned type and create a custom type for us.
// GIVEN TYPE AS: export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];

// NOTES (SEC 8):
// For data fetching inside of components we have two approaches.
// 1. Fetch data in parent and pass down as props to child components.
// 2. Fetch data in child and then use it.
// In this case we have used the hybrid approach that we will pass data as props down to the child component and fetch the data. 
// For this case we have created this file with functions used to fetch data for us for specific cases.
// We have also defined our custom type for the type of data we want to recieve from the database.
// Use the data fetching approaches only when components are reused at different places or data fetched by them is required at multiple places. If not only ftehc data in the desired component.