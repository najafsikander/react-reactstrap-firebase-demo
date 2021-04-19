import { useEffect, useState } from "react";
import firebase from '../../../Firebase/firebase';

const SignOut = () => {

    // State Vars

    const [isSignedOut, setIsSignedOut] = useState(false);
    
    // Init
    useEffect(()=>{
        console.info('Init signout: ', isSignedOut);
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('userDetails');
            setIsSignedOut(true);
        }).catch((error) => {
            setIsSignedOut(false);
        });
    },[isSignedOut]);
    return(
        <div>
            { isSignedOut === true && <h1>Successfully Signed Out</h1> }
            { isSignedOut === false && <h1>Error Signing out</h1> }
        </div>
    );
}

export default SignOut;