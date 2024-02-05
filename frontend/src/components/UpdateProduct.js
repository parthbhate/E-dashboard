import React, { useEffect } from "react";
import { useParams,useNavigate} from "react-router-dom"; // using hook here
const UpdateProduct = () => {
  //  we are usnig this to collect data from
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // console.warn(params);
    getProductDetails();
  },[]);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:3000/product/${params.id}`,{

    // by using this header authorization token  we can search  product 
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result = await result.json();
    console.warn(result);
    // Here we are asigning the results to the input fields
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    //  fetching Update API here
    let result = await fetch(`http://localhost:3000/product/${params.id}`, {
      method:"Put",
      body:JSON.stringify({ name, price, category, company }),
      headers:{
        'Content-Type':'Application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
   
      }
    });
    // ab jo hamara  result aayega usko hum change krenge JASON formate me
    result = await result.json();
    console.warn(result);
    navigate("/")
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name "
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product price "
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product category "
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product Company "
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button onClick={updateProduct} className="Appbutton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
