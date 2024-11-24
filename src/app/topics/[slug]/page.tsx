import PostCreateForm from "@/app/components/posts/post-create-form";
import PostList from "@/app/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicsShowPageProps {
    params: {
        slug: string
    }
}

const TopicsShowPage = async ({params}: TopicsShowPageProps) =>{
    const {slug} = await params;

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h2 className="text-2xl font-bold mb-2">{slug}</h2>
                <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
            </div>

            <div>
                <PostCreateForm slug={slug} />
            </div>
        </div>
    )
};

export default TopicsShowPage;


// NOTES (SEC 8):
// Creating the TopicShowPage to show the different topics added by the user based on the slug.
// Also we will proivde the user with the capability to create a new post tied to the topic slug/name.
// Since params are async and are coming during runtime of application we have to wait for then that is why adding async/await.
// Passing Slug as prop to the PostCreateForm so that we can use it to get the topic infor from Db based on this name/slug.
// Here using the PostList component and passing the fetch data function as props to fetch the data.
// Using the arrow function here as fetchPosts function requires an argument slug to fetch the data.