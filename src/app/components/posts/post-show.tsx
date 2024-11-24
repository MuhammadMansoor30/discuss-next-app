import { db } from "@/db";
import { notFound } from "next/navigation";

interface PostShowProps {
  postId: string
}

export default async function PostShow({postId}: PostShowProps) {
  const post = await db.post.findFirst({
    where: {id: postId}
  });

  if(!post){
    notFound();   // Custom 404 page provided by Nextjs if something is not found. 
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}

// NOTES (SEC 8):
// Creating the PostShow page to dispaly the data of specific post.
// Here as the component is simple and data is not required to be used by other component we will direclty fetch data in the component instaed if fteching data somewhere else and passing down the parent child hierarchy.
// Here we will only pass the postId props from the PostShowPage where the id is passed as params.