import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SingleStock(props: any) {
  const [stock, setStock] = useState({ id: "", name: "", price: "" });
  const { stockIndex } = useParams();
  // const single = stock[stockIndex - 1];
  console.log(stockIndex);

  const getStock = async () => {
    let response = await axios.get(`${process.env.REACT_APP_API_SERVER}`);
    console.log(response.data);
    setStock(response.data);
  };

  useEffect(() => {
    getStock();
  }, []);

  const handleClick = (event: any, key: any) => {
    console.log(event.target);
    console.log("key index: ", key);
  };

  return (
    <>
      <h1>Single</h1>
      {console.log(stock)}
      <h2>{stock.name}</h2>
      <h3>{stock.price}</h3>
      {/* <div>
        {stock.map((element: any, key: any) => (
          <div onClick={(event) => handleClick(event, key)} key={key}>
            { [key]: element[key as keyof typeof element] }
            <hr />
          </div>
        ))}
      </div> */}
    </>
  );
}
