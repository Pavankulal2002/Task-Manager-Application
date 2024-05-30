import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners'
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import './styles.css';
import Todo from './Todo';
import CreateTodoForm from './CreateTodoForm';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [allTasks, setAllTasks] = useState(null);
  // var tasks;

  const fetchUserData = async () => {
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
        const url = 'http://localhost:8000/task/get/'+userEmail;
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

  // fetchUserData();

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
  // return (
  //   <div className="home">
  //     {userDetails ? (
  //       <>
  //         <div style={{ display: "flex", justifyContent: "center" }}>
  //           <img
  //             src={userDetails.photo}
  //             width={"40%"}
  //             style={{ borderRadius: "50%" }}
  //           />
  //         </div>
  //         <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
  //         <div>
  //           <p>Email: {userDetails.email}</p>
  //           <p>First Name: {userDetails.firstName}</p>
  //           {/* <p>Last Name: {userDetails.lastName}</p> */}
  //         </div>
  //         <button className="btn btn-primary" onClick={handleLogout}>
  //           Logout
  //         </button>
  //       </>
  //     ) : (
  //       // <p>Loading...</p>

  //       <div className="loader">
  //         <ClipLoader color="#36d7b7" />
  //       </div>

  //     )}
  //   </div>
  // );
  const handleClickPhoto = () => {
    setDisplayDetails(!displayDetails);
  };

  function handleFilterChange(e){
    const newFilter = String(e.target.value);
    console.log(e.target.value);
    if(newFilter=='All'){
      setTasks(allTasks);
    }else{
      const newTasks = allTasks;
      const filteredTasks = newTasks.filter(item => item.Status === newFilter);
      setTasks(filteredTasks);
      console.log(filteredTasks);
    }
  }

  return (
    <div>
      <div className="top-div">
        <nav className="navbar">
          <div className="navbar-brand">ToDo APP</div>
          <div className="navbar-profile" onClick={handleClickPhoto}>
            <img
              src={userDetails?.photo}
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
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="fixed-bar">
        <div className="top-left">
          <CreateTodoForm user = {userDetails} fetchData = { fetchUserData }/>
        </div>
        <div className="top-right">
          <select className="filter-dropdown" onChange={(e)=>handleFilterChange(e)}>
            <option value="All" default>All</option>
            <option value="Todo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      <div className="app">
        <div className="todos">
        {tasks? tasks.map((todo) => <Todo key={todo._id} todo={todo} userEmail={userDetails?.email} fetchData = { fetchUserData }/>) : <div className="loader">
           <ClipLoader color="#36d7b7" />
        </div>} 
        </div>
      </div>
    </div>
  );

}
export default Profile;
