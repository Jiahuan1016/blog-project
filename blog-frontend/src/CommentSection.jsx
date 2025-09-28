import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/comment/article/${articleId}`);
      setComments(res.data);
    } catch (err) {
      console.error("loading error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await axiosInstance.post("/comment/add", null, {
        params: {
          articleId: articleId,
          content: content,
        },
      });
      setContent(""); 
      fetchComments(); 
    } catch (err) {
      console.error("comment unsuccessful", err);
    }
  };

  return (
    <div className="p-4 border-t mt-6">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

     
      <div className="space-y-2 mb-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="p-2 border rounded">
              <p className="text-sm">{c.content}</p>
              <span className="text-xs text-gray-500">
                {c.username || "unknown"} |{" "}
                {new Date(c.create_time).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet, be the first!</p>
        )}
      </div>

      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentSection;
