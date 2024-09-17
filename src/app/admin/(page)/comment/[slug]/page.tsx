import React from "react";
import CommentTable from "../comment-table";

const CommentByBlog = () => {
  return (
    <div>
      <div className="overflow-y-hidden">
        <div className="flex justify-between">
          <h3 className="text-3xl font-bold">Comments</h3>
        </div>
        <div className="mt-4">
          <CommentTable />
        </div>
      </div>
    </div>
  );
};

export default CommentByBlog;
