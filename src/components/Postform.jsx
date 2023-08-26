import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PostList from "./PostList";

function Postform() {
  const [user_id, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id,
      content,
    };
    setLoading(true);
    try {
      const res = await axios.post("https://clean-teal-zebra.cyclic.cloud/posts", payload);
      setLoading(false);
      console.log(res.data);
      toast("post added successfully");
      setUserId("");
      setContent("");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div
        className="container mt-5 border border-success border border-3 rounded-4"
        style={{ width: "600px" }}
      >
        <h2>Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_id">User ID</label>
            <input
              type="text"
              className="form-control"
              id="user_id"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Creating...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
      <div>
        <PostList />
      </div>
    </>
  );
}

export default Postform;
