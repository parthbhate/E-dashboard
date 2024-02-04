import React from "react";
import { Navigate, useNavigate } from "react-router-dom";


const AddProduct = () => {
  //  we are usnig this to collect data from
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const navigate = useNavigate();
   //  using validation for forms 
  const [error, setError]= React.useState(false)

  const addProduct = async () => {

    console.warn(!name);
    if(!name|| !price || !category || !company)
    {
      setError(true)
      return false;
    }
      //till here we have used  the validations 

    //console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    //console.warn(userId._id);
    let result = await fetch("http://localhost:3000/add-product", {
      method: "post",
      body: JSON.stringify({name, price, category, company, userId}),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
   
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/")
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name "
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* // validations */}
      {error && !name && <span className='invalid-input' >Enter valid name ! </span> }
      {/* till here  */}

      <input type="text" placeholder="Enter product price "
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

{error && !price && <span className='invalid-input' >Enter valid price ! </span> }
      <input
        type="text"
        placeholder="Enter product category "
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

{error && !category && <span className='invalid-input' >Enter valid category ! </span> }
      <input
        type="text"
        placeholder="Enter product Company "
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

{error && !company && <span className='invalid-input' >Enter valid company ! </span> }


      <button onClick={addProduct} className="Appbutton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
