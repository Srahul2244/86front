// src/components/UserForm.js
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Userlist from "./Userlist";

function Userform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      bio,
    };
    setLoading(true);
    // https://clean-teal-zebra.cyclic.cloud/users/all
    try {
      const res = await axios.post("https://clean-teal-zebra.cyclic.cloud/users", payload);
      setLoading(false);
      console.log(res.data);
      toast("user create successfully");
      setBio("");
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="container mt-5 border border-success border border-3 rounded-4"
        style={{ width: "600px" }}
      >
        <h2 className="--bs-success-text-emphasis">User Create</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control border border-2"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control border border-2"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              className="form-control border border-2"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            disabled={loading}
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
      <div style={{ marginTop: "40px" }}>
        <Userlist />
      </div>
    </>
  );
}

export default Userform;
