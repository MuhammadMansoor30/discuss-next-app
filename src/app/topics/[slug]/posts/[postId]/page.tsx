import Link from "next/link";
import PostShow from "@/app/components/posts/post-show";
import CommentList from "@/app/components/comments/comment-list";
import CommentCreateForm from "@/app/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import paths from "@/path";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <PostShow postId={postId}/>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}

// NOTES (SEC 8):
// Creating the Post Show Page to display the Posts Aong with there comments and comments list.
// The slug/name and postId is passed as params from the url as we have defined in the paths file and folder structure.
// The postId is passed as props to the PostShow component to retireve the specific post and its content.
// Now we will pass the ftechData function as props to the commnets List Component where the data will be fetched and used.
// Same as that of the TopicShowPafge where we passed the data for posts.
// More in Notes of TopicShowPage file.