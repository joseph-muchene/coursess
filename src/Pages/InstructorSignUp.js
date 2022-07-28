import React, { useRef } from 'react';
import { db } from '../firebaseconfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    let navigate = useNavigate();

  //get data from input
  const inEmailRef = useRef();
  const inPasswordRef = useRef();
  const inNameRef = useRef();
  const inPhoneRef = useRef();

  function SignUpInstructor() {
    const email = inEmailRef.current.value;
    const password = inPasswordRef.current.value;
    const username = inNameRef.current.value;
    const phone =  inPhoneRef.current.value;

    //run firebase stuff here
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        setDoc(doc(db, "instructors", user.uid), {
          InsName: username,
          InsUserEmail: email,
          phone: phone,
          userID: user.uid

        }).then(() => {
          navigate("/dashboard")
          console.log(user)
          console.log("user created")
        });
        // ...


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode)
        console.log(errorMessage)
        // ..
      });
  }

  return (
    <div>
      <h1> Sign up as Instructor</h1>
      <input type="text" ref={inNameRef} placeholder='Enter your username' /><br></br><br></br>
      <input type="password" placeholder='Enter your password' ref={inPasswordRef} /><br></br><br></br>
      <input type="email" placeholder='Enter your email' ref={inEmailRef} /><br></br><br></br>
      <input type="phone" placeholder='Enter your phone number' ref={inPhoneRef} /><br></br><br></br>
      <button onClick={SignUpInstructor}>Submit</button>


      <p>Already have an account?<Link to="/">Sign in</Link> </p>
    </div>
  )
}

export default Register