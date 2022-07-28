import React, { useState, useEffect } from "react";
import "../App.css";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseconfig";

function Studentdashboard() {
  const [courses, setCourse] = useState([]);

  console.log(courses);

  useEffect(() => {
    // fetch the courses
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      let courseItem = [];
      querySnapshot.forEach((doc) => {
        courseItem.push({ id: doc.id, ...doc.data() });
        setCourse([...courseItem]);
      });
    };

    fetchData();
  }, []);

  // useEffect(() => {

  //     // CourseName: cName,
  //     // Coursedesc: courseD,
  //     // Price: priceAmount,
  //     // UserEmail: useremail,
  //     // InName:inName,
  //     // phone:phoneD,
  //     // userID:user

  //     const q = query(collection(db, "courses"));

  //     getDocs(q).then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //             // doc.data() is never undefined for query doc snapshots
  //             //    setTheArray(oldArray => [...oldArray, newElement]);
  //             setCourse((initialState => [
  //                 ...initialState,
  //                 {
  //                     coureName: doc.data().CourseName,
  //                     coursedesc: doc.data().Coursedesc,
  //                     InName: doc.data().InName,
  //                     phone: doc.data().phone

  //                 }]))
  //         });
  //     })

  // }, [])

  console.log(courses);

  return (
    <div className="sDashboard">
      <Navbar />
      <div className="sidebar">
        <div className="logo"></div>

        <div className="lists">
          <ul>
            <li>
              <Link to="/sDashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/sCourses">My Courses</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          </ul>
          <hr></hr>
        </div>
      </div>

      <div className="main">
        <div className="container">
          {courses.map((course) => (
            <div
              key={Math.random()}
              style={{
                backgroundColor: "#000",
                color: "white",

                marginBottom: "14px",
                padding: "20px",
              }}
            >
              <div>
                <h3>{course.CourseName}</h3>
                <p>{course.Coursedesc}</p>
                <p></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Studentdashboard;
