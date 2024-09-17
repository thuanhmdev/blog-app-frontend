import BlogAddForm from "../../create/blog-form";

const PageUpdate = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="overflow-y-scroll max-h-screen pb-2">
      <h1 className="text-3xl font-bold mb-6">Update Blog</h1>
      <BlogAddForm id={params.slug ? params.slug : null} />
    </div>
  );
};

export default PageUpdate;
