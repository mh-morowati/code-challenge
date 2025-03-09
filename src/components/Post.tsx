import React from "react"

type PostProps = {
  title: string;
  body: string;
}

const Post: React.FC<PostProps> = ({ title, body }) => {
  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{body}</p>
    </div>
  );
};

export default Post
