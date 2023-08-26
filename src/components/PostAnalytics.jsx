import React, { useState, useEffect } from "react";
import axios from "axios";

function PostAnalytics() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  useEffect(() => {
    fetchPostAnalytics();
  }, []);

  const fetchPostAnalytics = async () => {
    try {
      const responseTotal = await axios.get(
        "https://clean-teal-zebra.cyclic.cloud/posts/analytics/posts"
      );
      setTotalPosts(responseTotal.data.total_posts);

      const responseTopLiked = await axios.get(
        "https://clean-teal-zebra.cyclic.cloud/posts/analytics/posts/top-liked"
      );
      setTopLikedPosts(responseTopLiked.data);
    } catch (error) {
      console.error("Error fetching post analytics:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Post Analytics</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Total Number of Posts</h5>
          <p className="card-text">{totalPosts}</p>
        </div>
      </div>

      <div className="mt-4">
        <h5>Top Liked Posts</h5>
        <ul className="list-group border border-warning-subtle border-4">
          {topLikedPosts.map((post, index) => (
            <li
              key={post._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className="badge badge-primary badge-pill">
                {index + 1}
              </span>
              {post.content}
              <span className="badge badge-success badge-pill">
                {post.likes} Likes
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostAnalytics;
