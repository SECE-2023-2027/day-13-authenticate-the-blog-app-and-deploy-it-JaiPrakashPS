"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/");
    } else {
      fetchBlogs();
    }
  }, [status, session]);

  async function fetchBlogs() {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  }

  async function deleteBlog(id) {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  }

  return (
    <div className={styles.container}>
  <h1 className={styles.title}>Admin Dashboard</h1>
  <button className={styles.btn} onClick={() => router.push("/admin/create")}>
    Create Blog
  </button>
  <ul className={styles.blogList}>
    {blogs.map(blog => (
      <li key={blog._id} className={styles.blogItem}>
        {blog.title}
        <button className={styles.btn} onClick={() => router.push(`/admin/edit/${blog._id}`)}>Edit</button>
        <button className={styles.btn} onClick={() => deleteBlog(blog._id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>

  );
}
