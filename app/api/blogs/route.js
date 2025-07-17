import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find();
  return Response.json(blogs);
}

export async function POST(req) {
  await connectDB();
  const { title, content, author } = await req.json();
  const blog = await Blog.create({ title, content, author });
  return Response.json(blog);
}
