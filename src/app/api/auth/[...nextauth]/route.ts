export {GET, POST} from "@/auth";


// NOTES (SEC 7):
// The route.ts file inside of out app directory is a special file used for providing event hanlders like Get Post ot others.
// We can create these handler function byy overself or export using any external library if installed.
// By default we dont need these event handlers to interact with our own server as that is done by using the server actions.
// These event handlers are required to use by the external servers to interact with our application.
// In our case the github server is the external user which will interact with our application for authtication purposes.