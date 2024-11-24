import type { Comment } from "@prisma/client";
import { db } from "..";

export type CommentWithAuthor = Comment & {
    user: {name: string | null; image: string | null},
};

export function fetchCommentsByPostId(postId: string){
    return db.comment.findMany({
        where: {postId},
        include: {
            user: {select: {name: true, image: true}}
        }
    });
}

// NOTES (SEC 8):
// Creating the Comments file for creating Db queries.
// Similar to that of posts.ts file inside of the same directory.
// Morw info in Notes of posts.ts file.