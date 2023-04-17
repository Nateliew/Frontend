import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

export default function App() {
  // const [openSingle, setOpenSingle] = useState(false);
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
  });

  const handleSave = async (stocks: any) => {
    console.log("working", stocks);
    await stocks.forEach((element: any) => {
      axios.post(`${process.env.REACT_APP_API_SERVER}`, {
        data: {
          symbol: element.symbol,
          name: element.companyName,
          price: element.latestPrice,
          percent: element.changePercent,
          change: element.change,
          image: `https://storage.googleapis.com/iex/api/logos/${element.symbol}.png`,
        },
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Stock price</h3>
          <h6>stocks</h6>
          <div className="stocks-container">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {stocks.map((stock: any) => (
                <div className="stock" key={stock.id}>
                  <h4>{stock.symbol}</h4>
                  <img
                    src={`https://storage.googleapis.com/iex/api/logos/${
                      stock.symbol as string
                    }.png`}
                    alt="logo"
                  />
                  <h5>${stock.companyName}</h5>
                  <h5>${stock.latestPrice}</h5>
                  <h5>${stock.changePercent}</h5>
                  <h5>${stock.change}</h5>
                </div>
              ))}
              {/* style a divider here */}
              <hr className="double" />
            </List>
          </div>
          <button onClick={() => handleSave(stocks)}>Save</button>
        </div>
      </header>
    </div>
  );
}
