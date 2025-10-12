import { createFileRoute } from "@tanstack/react-router";
import { NewPost } from "../../pages/posts/NewPost";

export const Route = createFileRoute("/posts/new")({
	component: NewPost,
});
