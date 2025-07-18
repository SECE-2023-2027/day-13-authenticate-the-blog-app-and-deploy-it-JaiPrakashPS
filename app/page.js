import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import styles from "./home.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Our Blog Platform</h1>
        <p className={styles.desc}>
          This is a modern blogging platform where users can explore exciting articles.
          Please login to view and engage with blogs.
        </p>

        <div className={styles.section}>
          <h2>About Our Blog App</h2>
          <p>
            Our blog application is designed to provide a seamless experience for reading and
            managing blogs. Users can sign in securely with GitHub, while the admin manages content.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Terms & Conditions</h2>
          <p>
            By using this platform, you agree to our terms and conditions. Content should respect
            intellectual property and community guidelines.
          </p>
        </div>
      </div>
    );
  }

  await connectDB();
  const blogs = await Blog.find().lean();

  return (
    <div className={styles.container}>
      <div className={styles.welcomeBox}>
        <h1>Welcome to Our Blog App, {session.user.name || "User"}!</h1>
        <p>
          Explore the latest blogs and share your thoughts. Make sure to follow our guidelines.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Terms & Conditions</h2>
        <p>
          By using this platform, you agree to respect community guidelines and intellectual
          property. Any violation may result in account suspension.
        </p>
      </div>
      <h1 className={styles.title}>All Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className={styles.blogCard}>
            <Link href={`/${blog._id}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.slice(0, 80)}...</p>
          </div>
        ))
      ) : (
        <p>No blogs available yet.</p>
      )}
    </div>
  );
}
