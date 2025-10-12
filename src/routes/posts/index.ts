import { createFileRoute } from "@tanstack/react-router";
import { PostsList } from "../../pages/posts/PostsList";

export const Route = createFileRoute("/posts/")({
	component: PostsList,
});
