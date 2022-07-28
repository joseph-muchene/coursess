import React, { useState } from 'react'
import '../firebaseconfig';
import { db } from '../firebaseconfig';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function Profile() {

    let navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState("");

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;


            const q = query(collection(db, 'users'), where("userID", "==", uid));

            getDocs(q).then((QuerySnapshot) => {
                QuerySnapshot.forEach((doc) => {

                    const username = doc.data.userName;

                    console.log(username)
                    setLoggedInUser(username);
                })
            })


            const userEmail = user.email;

        
            // ...
            console.log(uid);
            console.log(userEmail)
        } else {
            // User is signed out
            // ...
        }
    });


    function signOutUser() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login")
        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <div>
            <h1>profile</h1>
            <p>{loggedInUser}</p>
            <button onClick={signOutUser}>Logout</button>

        </div>
    )
}

export default Profile