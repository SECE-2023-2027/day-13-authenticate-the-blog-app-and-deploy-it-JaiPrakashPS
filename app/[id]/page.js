import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import styles from "./blog.module.css";

export default async function BlogDetail({ params }) {
  await connectDB();
  const blog = await Blog.findById(params.id).lean();

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className={styles.container}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p><b>Author:</b> {blog.author}</p>
    </div>
  );
}
