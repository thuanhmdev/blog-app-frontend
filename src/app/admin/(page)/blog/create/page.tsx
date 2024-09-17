import BlogAddForm from "./blog-form";

const BlogAdd = () => {
  return (
    <div className="overflow-y-scroll max-h-screen pb-2">
      <h1 className="text-3xl font-bold mb-6">Create Blog</h1>
      <BlogAddForm />
    </div>
  );
};

export default BlogAdd;
