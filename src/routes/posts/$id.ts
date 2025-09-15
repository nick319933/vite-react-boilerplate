import { createFileRoute } from "@tanstack/react-router";
import { EditPost } from "../../pages/posts/EditPost.tsx";

export const Route = createFileRoute("/posts/$id")({
	component: EditPost,
});
