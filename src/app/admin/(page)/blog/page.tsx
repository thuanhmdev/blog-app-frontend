import Link from "next/link";
import BlogTable from "./blog-table";

const page = async () => {
  return (
    <div className="overflow-y-hidden">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold">Blogs</h3>
        <Link
          href={`/admin/blog/create`}
          className="bg-blue-500 mt-2 text-white px-3 py-1.5 rounded-md hover:opacity-80 me-2"
        >
          Create Blog
        </Link>
      </div>
      <div className="mt-4">
        <BlogTable />
      </div>
    </div>
  );
};

page.propTypes = {};

export default page;
