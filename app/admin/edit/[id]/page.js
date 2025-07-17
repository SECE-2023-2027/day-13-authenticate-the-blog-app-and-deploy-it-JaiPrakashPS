"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../admin.module.css";

export default function EditBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();
  const params = useParams(); // Get dynamic id
  const id = params.id;

  // Fetch blog data by ID
  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      }
    }
    fetchBlog();
  }, [id]);

  // Update blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Failed to update blog");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Blog</h1>
      <form onSubmit={handleUpdate} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit" className={styles.btn}>Update</button>
      </form>
    </div>
  );
}
