"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "../common/form-button";
import { createComment } from "@/actions/create-comment";
import { useSession } from "next-auth/react";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({postId, parentId, startOpen}: CommentCreateFormProps) {
  const { data: session } = useSession();
  const userId = session?.user.id ?? '';
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useActionState(createComment.bind(null, { postId, parentId, userId }),{ errors: {} });

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const errorMessage = session ? (
    formState.errors._form ? (
      <div className="p-2 border-red border rounded bg-red-200">
        {formState.errors._form?.join(", ")}
      </div>
    ) : null
  ) : (
      <div className="p-2 border-red border rounded bg-red-200">
        Sign In to Create a New Post
      </div>
  );

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />
        {errorMessage}
        <FormButton>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}

// NOTES (SEC 8);
// Creating a CommentsCreate Form to create comments related to a specific post.
// Adding the server action to the form and validations so that we can pass only valid data.
// This Form is mostly similar to that of the topics-create-form.tsx and post-create form form.
// Can use the authetication error hanlding this way as well and the way used in topicsCreateForm as well.
// Now after recieving postId, parentId, startOpen as props we can use interface to assign its type
// Now we will use the bind method to bing the postId, ParentId and userId as paramater to the server action function we have created.