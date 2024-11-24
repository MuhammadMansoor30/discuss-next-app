import Image from "next/image";
import { Button } from "@nextui-org/react";
import type { CommentWithAuthor } from "@/db/queries/comments";
import CommentCreateForm from "./comment-create-form";

interface CommentShowProps {
  commentId: string;
  comments: CommentWithAuthor[],
}

// TODO: Get a list of comments
export default function CommentShow({ commentId, comments }: CommentShowProps) {
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}

// NOTES (SEC 8);
// Creating the Comments SHow component where all the coments and there sub-commnets are dispalyed on the screen.
// The comments are beign passed from the commnet-list component as props to this component.
// Here the show component is using the same data as the comments list component so we only pass the data.
// In case of post show component the data was different than the post list so we used different approach.