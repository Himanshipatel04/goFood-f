import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Card from "../components/Card";
import p1 from "../assets/stock-photo-tasty-dish-of-asian.jpg";
import p2 from "../assets/stock-photo-gyoza-japanese-korea.jpg";
import p3 from "../assets/stock-photo-asian-beef-fried-ric.jpg";

import axios from "axios";

const Home = () => {
  const [search,setSearch] = useState("")
  const [fooddata, setFoodData] = useState([]);
  const [catdata, setCatData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/getdata");
      setCatData(res.data.data.foodCategory);
      console.log(res.data.data);
      if (res.data && res.data.data && res.data.data.food_items) {
        setFoodData(res.data.data.food_items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner h-[450px] relative z-0">
          <div className="crousel-caption w-50 ml-96 absolute bottom-5 z-10 ">
            <div class="flex justify-center items-center ">
              <input
                className="form-control me-2 h-10"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
              />
              {/* <button class="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active ">
            <img src={p1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={p2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item h-72">
            <img src={p3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="m-10">
        {catdata?.map((category) => (
          <div key={category._id}>
            <div className="fs-3 m-3">{category.CategoryName}</div>
            <hr />
            <div className="flex flex-wrap gap-4">
              {fooddata
                ?.filter((item) => (item.CategoryName === category.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase()))))
                .map((item) => (
                  <Card
                    foodItem = {item}
                    options={item.options[0]}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
