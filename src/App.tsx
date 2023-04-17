import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";

export default function App() {
  const [stocks, setStocks] = useState<any[]>([]);

  // //obtain all the stocks data in DB
  // const getInitialData = async () => {
  //   let initialAPICall = await axios.get(`${process.env.REACT_APP_API_SERVER}`);
  //   setStocks(initialAPICall.data);
  // };

  // // load upon starting up the app
  // useEffect(() => {
  //   //if the stock information is not updated, retrieve from API
  //   getInitialData();
  // }, []);

  useEffect(() => {
    axios
      .all([
        axios.get(
          "https://api.iex.cloud/v1/data/CORE/QUOTE/AAPL?token=pk_4a23a8e75ce54c35bd704366adb5115d"
        ),
        axios.get(
          "https://api.iex.cloud/v1/data/CORE/QUOTE/NFLX?token=pk_4a23a8e75ce54c35bd704366adb5115d"
        ),
        axios.get(
          "https://api.iex.cloud/v1/data/CORE/QUOTE/GOOG?token=pk_4a23a8e75ce54c35bd704366adb5115d"
        ),
        axios.get(
          "https://api.iex.cloud/v1/data/CORE/QUOTE/AMZN?token=pk_4a23a8e75ce54c35bd704366adb5115d"
        ),
        axios.get(
          "https://api.iex.cloud/v1/data/CORE/QUOTE/TSLA?token=pk_4a23a8e75ce54c35bd704366adb5115d"
        ),
      ])
      .then(
        axios.spread((...responses) => {
          //map out and check if there are duplicates
          responses.map((response: any) => {
            let name = response.data[0].companyName;
            let check = stocks.some((el) => el.companyName === name);
            console.log(stocks);

            if (check === false) {
              stocks.push(response.data[0]);
            }
          });
        })
      );
  }, []);

  const handleSave = async (stocks: any) => {
    console.log("work", stocks);
    // await stocks.forEach((element: any) => {
    //   axios.post(`${process.env.REACT_APP_API_SERVER}`, {
    //     data: {
    //       symbol: element.symbol,
    //       name: element.companyName,
    //       price: element.latestPrice,
    //       percent: element.changePercent,
    //       change: element.change,
    //       image: `https://storage.googleapis.com/iex/api/logos/${element.symbol}.png`,
    //     },
    //   });
    // });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Stock price</h3>
          <h6>stocks</h6>
          <div className="stocks-container">
            <List sx={{ width: 550, bgcolor: "background.paper" }}>
              {stocks.map((stock: any) => (
                <div className="stock" key={stock.id}>
                  <img
                    src={`https://storage.googleapis.com/iex/api/logos/${
                      stock.symbol as string
                    }.png`}
                    alt="logo"
                    className="pic"
                  />
                  <div className="middle">
                    <h4>{stock.symbol}</h4>
                    <h5>{stock.companyName}</h5>
                  </div>
                  <div className="right">
                    <h5>${stock.latestPrice}</h5>
                    <h5 className={stock.changePercent > 0 ? "good" : "bad"}>
                      {stock.changePercent}
                    </h5>
                    <h5 className={stock.changePercent > 0 ? "good" : "bad"}>
                      {stock.change}
                    </h5>
                  </div>
                  {/* style a divider here */}
                  <hr className="single" />
                </div>
              ))}
            </List>
          </div>
          <button onClick={() => handleSave(stocks)}>Save</button>
        </div>
      </header>
    </div>
  );
}
