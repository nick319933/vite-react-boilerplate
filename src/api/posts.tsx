export type Post = {
	id: string;
	title: string;
	body: string;
};

let posts: Post[] = [
	{ id: "1", title: "Перший пост", body: "Текст першого поста" },
	{ id: "2", title: "Другий пост", body: "Другий пост тут" },
];

export const getAllEntities = async (): Promise<Post[]> => [...posts];

export const deleteEntity = async (id: string): Promise<void> => {
	posts = posts.filter((post) => post.id !== id);
};

export const getEntityById = async (id: string): Promise<Post | undefined> =>
	posts.find((post) => post.id === id);

export const createEntity = async (data: Omit<Post, "id">): Promise<Post> => {
	const newPost = { id: Date.now().toString(), ...data };
	posts.push(newPost);
	return newPost;
};

export const updateEntity = async (
	id: string,
	data: Omit<Post, "id">,
): Promise<Post | undefined> => {
	posts = posts.map((p) => (p.id === id ? { ...p, ...data } : p));
	return posts.find((p) => p.id === id);
};
