import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd'; // Import Modal and Button from Ant Design
import './styles/Dashboard.css'; 
import axios from 'axios';
import Login from './Login'; // Import your Login component
import { useLocation } from 'react-router-dom'; // Import useLocation for hooks-based routing

const Dashboard = () => {
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    toDo: 0,
  });

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // State to control logout modal visibility
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false); // State to control login modal visibility
  const location = useLocation(); // Get the location object from React Router
  const username = location.state?.username; // Safely access username from location.state

  useEffect(() => {
    const fetchTasks = async () => {
      if (!username) {
        console.error("Username is not defined");
        return; // Exit early if username is not defined
      }
      
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/users?username=${username}`);
        const user = userResponse.data.find(u => u.username === username);
        const userId = user ? user._id : null;

        if (userId) {
          const tasksResponse = await axios.get(`http://localhost:5000/api/users/${userId}/assigned-tasks`);
          const tasks = tasksResponse.data;

          const completed = tasks.filter(task => task.status === 'Done').length;
          const inProgress = tasks.filter(task => task.status === 'In Progress').length;
          const toDo = tasks.filter(task => task.status === 'To Do').length;
          const total = tasks.length;

          setTaskCounts({ total, completed, inProgress, toDo });
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, [username]);

  const completedPercent = (taskCounts.completed / taskCounts.total) * 100 || 0;
  const inProgressPercent = (taskCounts.inProgress / taskCounts.total) * 100 || 0;
  const toDoPercent = (taskCounts.toDo / taskCounts.total) * 100 || 0;

  const showLogoutModal = () => setIsLogoutModalVisible(true); // Function to show the logout modal
  const handleLogoutOk = () => {
    setIsLogoutModalVisible(false); // Close the logout modal
    setIsLoginModalVisible(true); // Open the login modal
  };
  const handleLogoutCancel = () => setIsLogoutModalVisible(false); // Function to close the logout modal
  const stayIn = () => handleLogoutCancel(); // Close the logout modal

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>{username ? `${username}'s Dashboard` : 'Dashboard'}</h2>
        <Button type="primary" className='dash-log-out' onClick={showLogoutModal} style={{ marginLeft: '710px' , marginRight:'10px' , height:'40px' }}>
          Log Out
        </Button>
      </div>

      <div className="task-cards">
        <div className="card">
          <h3>Total Assigned Tasks</h3>
          <p>{taskCounts.total}</p>
        </div>
        <div className="card">
          <h3>Completed Tasks</h3>
          <p>{taskCounts.completed}</p>
        </div>
        <div className="card">
          <h3>In Progress Tasks</h3>
          <p>{taskCounts.inProgress}</p>
        </div>
        <div className="card">
          <h3>To Do Tasks</h3>
          <p>{taskCounts.toDo}</p>
        </div>
      </div>

      {/* Single Progress Bar with 3 Sections */}
      <div className="progress-card">
        <h3 className='h3'>Task Progress</h3>
        <div className="progress-bar-container">
          <div
            className="progress-bar completed"
            style={{ width: `${completedPercent}%`, backgroundColor: '#201E43' }}
          >
            <strong>{`${Math.round(completedPercent)}% Completed`}</strong>
          </div>
          <div
            className="progress-bar in-progress"
            style={{ width: `${inProgressPercent}%`, backgroundColor: '#134B70' }}
          >
            <strong>{`${Math.round(inProgressPercent)}% In Progress`}</strong>
          </div>
          <div
            className="progress-bar to-do"
            style={{ width: `${toDoPercent}%`, backgroundColor: '#508C9B' }}
          >
            <strong>{`${Math.round(toDoPercent)}% kaam kar mf`}</strong>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Logout Confirmation"
        visible={isLogoutModalVisible}
        onOk={handleLogoutOk}
        onCancel={handleLogoutCancel}
        footer={[
          <Button key="back" onClick={stayIn}>
            Stay In
          </Button>,
          <Button key="submit" type="primary" onClick={handleLogoutOk}>
            Log Out
          </Button>,
        ]}
      >
        <p>Do you want to log out?</p>
      </Modal>

      {/* Login Modal */}
      <Modal
        title="Login"
        className='Login'
        visible={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)} // Close the login modal
        footer={null} // You can customize the footer as needed
        width={500}
      >
        <Login /> {/* Render the Login component here */}
      </Modal>
    </div>
  );
};

export default Dashboard;
