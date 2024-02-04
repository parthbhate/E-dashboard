import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

//   removing /login path which redirect to login page form URL bar 
//  code to remove /login path , jab login krne ke bad hum URL bar pe /login type krnte h tab bhi hum redirect ho jate h login page pr jab ki aisa nahi  hona chaiye  ,, SO niche wala code us problem ko remove krega ...

useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth)
    {
        navigate("/");
    }     
})    // bs itna code krne ke bad /login redirect ki problem will dissapeare 


  const handleLogin = async () => {
    console.log("email,password", email, password);
    let result = await fetch("http://localhost:3000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth ));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };
  return (
    <div className="login">
      <h1>
        Login
        <input
          type="text"
          className="inputBox"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="inputBox"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleLogin} className="Appbutton" type="button">
          Login
        </button>
      </h1>
    </div>
  );
};

export default Login;
