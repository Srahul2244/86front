import React, { useState, useEffect } from "react";
import axios from "axios";

function UserAnalytics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [topActiveUsers, setTopActiveUsers] = useState([]);

  useEffect(() => {
    fetchUserAnalytics();
  }, []);

  const fetchUserAnalytics = async () => {
    try {
      const responseTotal = await axios.get(
        "https://clean-teal-zebra.cyclic.cloud/users/analytics/users"
      );
      setTotalUsers(responseTotal.data.total_users);

      const responseTopActive = await axios.get(
        "https://clean-teal-zebra.cyclic.cloud/users/analytics/users/top-active"
      );
      setTopActiveUsers(responseTopActive.data);
    } catch (error) {
      console.error("Error fetching user analytics:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Analytics</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Total Number of Users</h5>
          <p className="card-text">{totalUsers}</p>
        </div>
      </div>

      <div className="mt-4">
        <h5>Top Active Users</h5>
        <ul className="list-group border border-primary border-4">
          {topActiveUsers.map((user, index) => (
            <li
              key={user._id}
              className="list-group-item d-flex justify-content-between align-items-center "
            >
              <span className="badge badge-primary badge-pill">
                {index + 1}
              </span>
              {user.name}
              <span className="badge badge-success badge-pill">
                {user.postCount} Posts
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserAnalytics;
