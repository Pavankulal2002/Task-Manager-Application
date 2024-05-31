import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners'
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import './styles.css';
import Todo from './Todo';
import CreateTodoForm from './CreateTodoForm';
import Button from 'react-bootstrap/Button';


function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [allTasks, setAllTasks] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const fetchUserData = async (e) => {
    auth.onAuthStateChanged(async (user) => {
      // Check if user is logged in
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User data does not exist");
          return;
        }

        const userEmail = user.email;
        const url = 'http://localhost:8000/task/get/' + userEmail;
        const response = await axios.get(url)
        const responseData = response.data["data"];
        // tasks = responseData;
        setTasks(responseData);
        setAllTasks(responseData);
        console.log(responseData);
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  const handleClickPhoto = () => {
    setDisplayDetails(!displayDetails);
  };

  async function handleFilterChange() {
    const newFilter = document.querySelector(".filter-dropdown").value;
    if (newFilter === 'All') {
      const allTasksArray = Object.values(allTasks); // Convert the object to an array
      const reversedTasks = allTasksArray.reverse(); // Reverse the order of the array
    setTasks(reversedTasks);

    } else {
      const newTasks = allTasks;
      console.log(newTasks);
      const filteredTasks = newTasks.filter(item => item.Status === newFilter).reverse();
      setTasks(filteredTasks);
      console.log(filteredTasks);
    }
  }

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      handleFilterChange();
    }
  }, [allTasks]);
  
  return (
    <div>
      <div className="top-div">
        <nav className="navbar">
          <div className="navbar-brand">Task Manager</div>
          <div className="navbar-profile" onClick={handleClickPhoto}>
            <img
              src={userDetails?.photo|| require("../profile.png")}
              alt="Profile"
              width="40px"
              style={{ borderRadius: "50%" }}
            />
            {displayDetails && (
              <div className="togle-menu">
                <div className="profile-box">

                  <p>{userDetails?.firstName}</p>
                  <p>{userDetails?.email}</p>

                </div>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
                
                <Button variant="outline-dark"><span aria-hidden='true'>&times;</span></Button>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="fixed-bar">
        <div className="top-left">
          <CreateTodoForm user={userDetails} fetchData={fetchUserData} />
        </div>
        <div className="top-right">
          <select className="filter-dropdown" onChange={handleFilterChange}>
            <option value="All" default>All</option>
            <option value="Todo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      <div className="app">
        <div className="todos">
          {tasks && tasks.length === 0 ? (
            <p className="no-tasks">NO TASKS</p>
          ) : (tasks ? tasks.map((todo) => <Todo key={todo._id} todo={todo} userEmail={userDetails?.email} fetchData={fetchUserData} />) : (<div className="loader">
            <ClipLoader color="#36d7b7" />
          </div>))}

        </div>
      </div>
    </div>
  );

}
export default Profile;
