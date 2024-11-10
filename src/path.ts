const paths = {
    home(){
        return '/';
    },
    topicShow(topicsSlug: string){
        return `/topics/${topicsSlug}`;
    },
    postCreate(topicsSlug: string){
        return `/topics/${topicsSlug}/posts/new`;
    },
    postShow(topicsSlug: string, postId: string){
        return `/topics/${topicsSlug}/posts/${postId}`;
    }
};

export default paths;

// NOTES (SEC 7):
// Creating a path helper object to allow us to matnage the application paths more efficiently.
// By creating this object we can easily modify the paths of the application from the single file and the changes will be reflected to the entire app making it easy to implement and debug.  
// The topic slug here is the name of the specific topic like javascript, python and so on.