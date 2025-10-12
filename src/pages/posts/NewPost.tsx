import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../../common/types";
import { createEntity, Post } from "../../api/posts";

export const NewPost = (): FunctionComponent => {
	const [form, setForm] = useState<Omit<Post, "id">>({
		title: "",
		body: "",
	});
	const [error, setError] = useState("");
	const [created, setCreated] = useState(false);

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

		await createEntity(form);
		setCreated(true);
	};

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
			<div className="w-full max-w-2xl bg-gray-800 p-10 rounded-3xl text-white shadow-2xl border border-gray-700">
				<h2 className="text-3xl font-bold mb-6">➕ Створити новий пост</h2>

				{error && <p className="text-red-400 mb-4">{error}</p>}

				{!created ? (
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
							className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
						>
							✅ Створити пост
						</button>
					</>
				) : (
					<div className="text-center">
						<p className="text-green-400 text-xl mb-6">
							✅ Пост створено успішно!
						</p>
						<Link
							to="/posts"
							className="inline-block bg-green-700 hover:bg-green-600 text-white font-medium py-2 px-5 rounded-xl"
						>
							🔙 Повернутись до списку
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};