import { useEffect, useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { FunctionComponent } from "../../common/types";
import { getEntityById, updateEntity, Post } from "../../api/posts";

export const EditPost = (): FunctionComponent => {
	const { id } = useParams({ from: "/posts/$id" });
	const [form, setForm] = useState<Omit<Post, "id">>({
		title: "",
		body: "",
	});
	const [error, setError] = useState("");
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		getEntityById(id).then((post) => {
			if (post) {
				setForm({ title: post.title, body: post.body });
			}
		});
	}, [id]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		if (!form.title.trim()) {
			setError("Заголовок обовʼязковий");
			return;
		}

		await updateEntity(id, form);
		setUpdated(true);
	};

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
			<div className="w-full max-w-2xl bg-gray-800 p-10 rounded-3xl text-white shadow-2xl border border-gray-700">
				<h2 className="text-3xl font-bold mb-6">✏ Редагування поста</h2>

				{error && <p className="text-red-400 mb-4">{error}</p>}

				{!updated ? (
					<>
						<input
							name="title"
							value={form.title}
							onChange={handleChange}
							placeholder="Заголовок"
							className="w-full mb-4 p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
						/>

						<textarea
							name="body"
							value={form.body}
							onChange={handleChange}
							placeholder="Зміст"
							className="w-full mb-6 p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 h-40"
						/>

						<button
							onClick={handleSubmit}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
						>
							💾 Зберегти зміни
						</button>
					</>
				) : (
					<div className="text-center">
						<p className="text-green-400 text-xl mb-6">✅ Зміни збережено!</p>
						<Link
							to="/posts"
							className="inline-block bg-blue-700 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-xl"
						>
							🔙 Повернутись до списку
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};