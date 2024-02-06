import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Foooter from './components/Foooter';
import Nav from './components/Nav';
import SignUp from './components/SignUp';
//import PrivateRoutComponent from './components/PrivateRoutComponents';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import PrivateRoutComponents from './components/PrivateRoutComponents';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Nav />
<Routes>

<Route element ={<PrivateRoutComponents/>}>

  <Route path ="/" element ={<ProductList/>}/>
  <Route path ="/add" element ={<AddProduct/>}/>
  <Route path ="/update/:id" element ={<UpdateProduct/>}/>
  <Route path ="/logout" element ={<h1>Logout Product Component </h1>}/>
  {/* <Route path ="/Profile" element ={<h1>Profile Component </h1>}/> */}
</Route>

<Route path ="/SignUp" element ={<SignUp/>}/>
<Route path ="/Login" element ={<Login/>}/>
</Routes>
  </BrowserRouter>
  <Foooter/>

    </div>
  );
}

export default App;
