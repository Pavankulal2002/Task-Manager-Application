import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners'
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import './styles.css'
import CreateTodoButton from './CreateTodoButton';
import FilterDropdown from './FilterDropdown';
import Todo from './Todo';
import CreateTodoForm from './CreateTodoForm';
import UpdateTodoForm from './UpdateTodoForm';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [displayDetails, setDisplayDetails] = useState(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) { // Check if user is logged in
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User data does not exist");
        }
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
      window.location.href = "/login";
      console.log("User logged out successfully!");
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

  let todos=[
    {
      Title: 'Learn running today very fast',
      Description: 'I need to learn cooking to eat food',
      Status: 'InProgress',
      Duedate: "2029-09-07",
      _id: '6655ed977esfb6a9a766054a3'
    },
    {
      Title: 'Learn running today',
      Description: 'I need to learn cooking to eat food',
      Status: 'Todo',
      Duedate: "2029-09-07",
      _id: '6655ed987efb6a9a7s66054a5'
    },  
]
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
          <CreateTodoForm />
        </div>
        <div className="top-right">
          <FilterDropdown />
        </div>
      </div>
      <div className="app">
        <div className="todos">
        {todos.map((todo) => <Todo key={todo._id} todo={todo}/>)}
          
        </div>
      </div>
    </div>
    
  
  );

}
export default Profile;
