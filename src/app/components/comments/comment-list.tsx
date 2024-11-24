import CommentShow from "./comment-show";
import type { CommentWithAuthor } from "@/db/queries/comments";

interface CommentListProps {
  fetchData: () => Promise<CommentWithAuthor[]>,
}; 

export default async function CommentList({fetchData}: CommentListProps) {
  const comments = await fetchData();

  const topLevelComments = comments.filter((comment) => comment.parentId === null);
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}


// NOTES (SEC 8):
// Creating the Commnets List page component to list down the comments for the given post.
// The functionality is sam eas that of the post-list component. More info is mentioned in Notes section there.
// Here addition is that we are alos passing the commnets donw as props to the commneys Show COmponent where ther will actually be rendered and shown.