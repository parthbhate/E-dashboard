import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3000/products",{

    // by using this header authorization token  we can get the  product 
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      // token ends here
    });
    result = await result.json();
    setProducts(result);
  };
  //console.warn("products", products);

  const deleteProduct = async (id) => {
    // console.warn(id); -----> just to chehck if we are getting id on click of a button or not

    //NOW  below we are integrating API in REACT  fornt-End
    let result = await fetch(`http://localhost:3000/product/${id}`, {
      method: "Delete",

      // by using this header authorization token  we can delete product 
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      getProducts(); // by using this get method we can see realtime changes in deleted methods
      alert("Record will be deleted ");//this will show the alert message 
    }
  };

const searchHandle = async(event)=>{
 // console.warn(event.target.value);
 let key = event.target.value;
 if(key){
  let result = await fetch(`http://localhost:3000/search/${key}`,{

  // by using this header authorization token  we can search  product 
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result = await result.json();
  if(result){
    setProducts(result);
  }
 }else{
  getProducts()
 }
 

}

  return (
    <div className="product-list">
      <h3>Product List</h3>
      {/* making search bar  */}
      <input type="text" className="search-product-box" placeholder="Search Product"
      onChange={searchHandle} />
      <ul>
        <li>S.NO</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
      products.length>0 ?
       products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/"+item._id}>Update</Link>
            {/* Making update dynamic when click on update we will redirected towards the update page with id of each product with it  */}
          </li>
          {/* The data will be deleted on this onclick  */}
        </ul>
      )
      )
   :<h1>No Result Found !!</h1>
      }
    </div>
  );
};
export default ProductList;
