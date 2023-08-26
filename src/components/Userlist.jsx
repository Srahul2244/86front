import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Userlist() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    bio: "",
  });
  async function fetchData() {
    try {
      const res = await fetch(
        "https://clean-teal-zebra.cyclic.cloud/users/all"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setUsers(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // delete data from ui.

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://clean-teal-zebra.cyclic.cloud/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // modal open for view option

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  // for edit button modal option
  const handleEdit = (user) => {
    setSelectedUser(user); //putting user vvalue in selcted User
    setEditedUser(user); //this is for value catching for tht specific id
    setShowEditModal(true); //this is for oepning model for edit
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(
        `https://clean-teal-zebra.cyclic.cloud/users/${selectedUser._id}`,
        editedUser
      );
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.bio}</td>
              <td>
                <button
                  className="btn btn-sm btn-info mr-2"
                  onClick={() => handleView(user)}
                  style={{ marginRight: "20px" }}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-warning mr-2"
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: "20px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user._id)}
                  style={{ marginRight: "20px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Bio:</strong> {selectedUser.bio}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={editedUser.bio}
                onChange={handleEditInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Userlist;
