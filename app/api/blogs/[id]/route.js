import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(_, { params }) {
  await connectDB();
  const blog = await Blog.findById(params.id);
  return Response.json(blog);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updatedBlog = await Blog.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updatedBlog);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Blog.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted" });
}
