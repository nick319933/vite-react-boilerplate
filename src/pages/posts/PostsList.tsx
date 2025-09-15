import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../common/types";
import { getAllEntities, deleteEntity, Post } from "../../api/posts";

export const PostsList = (): FunctionComponent => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		getAllEntities().then(setPosts);
	}, []);

	const handleDelete = async (id: string) => {
		if (confirm("Ви точно хочете видалити цей пост?")) {
			await deleteEntity(id);
			const updated = await getAllEntities();
			setPosts(updated);
		}
	};

	return (
		<div className="max-w-4xl mx-auto mt-12 px-8 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl rounded-3xl text-gray-100">
			<h1 className="text-4xl font-extrabold text-center mb-10 select-none">
				📝 Список постів
			</h1>

			<div className="flex justify-end mb-8">
				<Link to="/posts/new">
					<button className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 text-white font-semibold px-6 py-3 rounded-2xl transition duration-300 shadow-lg">
						➕ Створити
					</button>
				</Link>
			</div>

			<ul className="space-y-6">
				{posts.map((post) => (
					<li
						key={post.id}
						className="flex justify-between items-center bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow"
					>
						<div className="max-w-[70%]">
							<Link
								to={`/posts/${post.id}`}
								className="text-2xl font-semibold text-green-400 hover:text-green-300 hover:underline transition-colors select-text"
							>
								{post.title}
							</Link>

							<p className="text-gray-400 text-sm mt-1 select-none">
								ID: {post.id}
							</p>

							<p className="text-gray-300 mt-3 text-base leading-relaxed break-words line-clamp-3">
								{post.body}
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link to={`/posts/${post.id}`}>
								<button className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 text-white px-5 py-2 rounded-2xl font-medium transition duration-300 shadow">
									✏ Редагувати
								</button>
							</Link>
							<button
								onClick={() => handleDelete(post.id)}
								className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 text-white px-5 py-2 rounded-2xl font-medium transition duration-300 shadow"
							>
								🗑 Видалити
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
