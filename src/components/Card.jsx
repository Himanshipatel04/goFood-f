import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let options = props.options;
  let foodItem = props.foodItem; // Corrected props item
  let data = useCart();
  let priceOption = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleCart = async () => {
    let food = data.find(item => item.id === foodItem._id); // Simplified lookup

    console.log(food);
    console.log(new Date());

    if (food) {
      // If food item is found in the cart
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img, // Corrected image source
        });
        console.log("Size different so simply ADD one more to the list");
      }
    } else {
      // If food item is not found in the cart
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img, // Corrected image source
      });
    }
    console.log(data);
  };

  return (
    <div className="card m-4" style={{ width: "20rem", maxHeight: "450px" }}>
      <img
        src={props.foodItem.img}
        className="card-img-top h-44 object-cover"
        alt={props.foodItem.name} // Updated alt text for better accessibility
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text">{props.foodItem.description}</p>
        <div className="container w-100 flex items-center justify-between gap-4">
          <select
            onChange={(e) => setQty(e.target.value)}
            className="h-100 w-50 bg-success text-white outline outline-white rounded"
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSize(e.target.value)}
            ref={priceRef}
            className="h-100 w-50 bg-success text-white outline outline-white rounded-sm"
          >
            {priceOption.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
           
          <div className="text-lg font-bold">{finalPrice}/-</div>
        </div>
        <hr></hr>
        <button
          onClick={handleCart}
          className="m-2 mt-3 h-8 flex items-center justify-center p-1 font-bold text-black bg-success rounded-md "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
