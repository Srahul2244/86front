import React, { useState, useEffect } from "react";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedViewPost, setSelectedViewPost] = useState(null);
  const [selectedEditPost, setSelectedEditPost] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://clean-teal-zebra.cyclic.cloud/posts/post"
      );
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `https://clean-teal-zebra.cyclic.cloud/posts/${postId}/like`
      );
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await axios.post(
        `https://clean-teal-zebra.cyclic.cloud/posts/${postId}/unlike`
      );
      fetchPosts();
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `https://clean-teal-zebra.cyclic.cloud/posts/${postId}`
      );
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openViewModal = (post) => {
    setSelectedViewPost(post);
  };

  const closeViewModal = () => {
    setSelectedViewPost(null);
  };

  const openEditModal = (post) => {
    setSelectedEditPost(post);
    setEditContent(post.content);
  };

  const closeEditModal = () => {
    setSelectedEditPost(null);
    setEditContent("");
  };

  const handleEditContentChange = (event) => {
    setEditContent(event.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `https://clean-teal-zebra.cyclic.cloud/posts/${selectedEditPost._id}`,
        {
          content: editContent,
        }
      );
      fetchPosts();
      closeEditModal();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Post List</h2>
      <ul className="list-group">
        {posts.map((post) => (
          <li
            key={post._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {post.content}
            <div>
              <button
                className="btn btn-primary btn-sm mr-2"
                style={{ marginRight: "20px" }}
                onClick={() => handleLike(post._id)}
              >
                Like ({post.likes})
              </button>
              <button
                className="btn btn-secondary btn-sm mr-2"
                style={{ marginRight: "20px" }}
                onClick={() => handleUnlike(post._id)}
              >
                Unlike
              </button>
              <button
                className="btn btn-info btn-sm mr-2"
                style={{ marginRight: "20px" }}
                onClick={() => openViewModal(post)}
              >
                View
              </button>
              <button
                className="btn btn-warning btn-sm mr-2"
                onClick={() => openEditModal(post)}
                style={{ marginRight: "20px" }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                style={{ marginRight: "20px" }}
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* View Modal */}
      <div
        className={`modal ${selectedViewPost ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: selectedViewPost ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">View Post</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeViewModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{selectedViewPost && selectedViewPost.content}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className={`modal ${selectedEditPost ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: selectedEditPost ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Post</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeEditModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                value={editContent}
                onChange={handleEditContentChange}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
