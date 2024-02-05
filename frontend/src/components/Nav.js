//import React, { useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
const Nav=()=>{
    const auth = localStorage.getItem('user')
    const navigate =  useNavigate();    // using this hook to show logout without refrashing the whole page 
    const logout =()=>{
        // console.warn("apple");
        localStorage.clear();
        navigate('/signup')
    }


    return(
        <div>
        <img alt="logo" className='logo' src='https://img.freepik.com/free-vector/flat-sunset-background-with-palm-trees_23-2147824486.jpg?w=740&t=st=1705665568~exp=1705666168~hmac=6771188084efbcfc8f754a277c42bb2e8616d016a805b84369822e6a79fa75ef'/>
          { auth ?  <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Products</Link></li>
                {/* <li><Link to="/logout">Logout</Link></li> */}
                <li><Link to="/Profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
               
            </ul>
            :
            <ul className='nav-ul Nav-right'>
                <li>
                <Link to="/signup">Sign Up</Link></li>
                <li><Link to="/Login">Login</Link>
                </li>
            </ul>
          }
        </div>
        
    )
}
export default Nav;