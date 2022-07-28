import React, { useRef } from 'react';
import { db } from '../firebaseconfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar2';


function Register() {
  
  //get data from input
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  let navigate = useNavigate();

  function SignUpUser() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = nameRef.current.value;

    console.log(nameRef);

    //run firebase stuff here
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)

        setDoc(doc(db, "users", user.uid), {
          userName: username,
          userEmail: email,
          userID: user.uid

        }).then((data) => {
          console.log(data)
          navigate("/profile")
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
       <Navbar/>
      <h1> Register</h1>

      <div className='main'>
      <input type="text" ref={nameRef} placeholder='Enter your username' /><br></br><br></br>
      <input type="password" placeholder='Enter your password' ref={passwordRef} /><br></br><br></br>
      <input type="email" placeholder='Enter your email' ref={emailRef} /><br></br><br></br>
      <button onClick={SignUpUser}>Submit</button>
      </div>


      <p>Already have an account?<Link to="/">Sign in</Link> </p>
    </div>
  )
}

export default Register