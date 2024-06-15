import {auth} from "../config/firebase"
import { Link } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"
import "../App.css";
import {signOut} from 'firebase/auth';
export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut=async ()=>{
        await signOut(auth);

    }
  
    return (
      <div className="navbar">
        
        <div className="navbar-links">
          <Link className="navbar-link" to="/">Home</Link>
          {!user?(<Link className="navbar-link" to="/login">Login</Link>):
          (<Link to={"/createpost"} className="navbar-link">Create Post</Link>)}
        </div>
        <div className="navbar-user">
          {user ? (
            <>
              <p className="navbar-username">{user?.displayName}</p>
              <img className="navbar-user-img" alt="user-img" src={user?.photoURL} />
              <button onClick={signUserOut}>Log Out</button>
            </>
          ) : (
            <p className="navbar-no-user">No user signed in</p>
          )}
        </div>
      </div>
    );
  };