import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function App() {
  const [stocks, setStocks] = useState<any[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();

  // load upon starting up the app
  useEffect(() => {
    //if the stock information is not updated, retrieve from API
    getInitialData();
  }, []);

  const getInitialData = async () => {
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
  };

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
        <h3>Stock price</h3>
        <h6>stocks</h6>
        <div className="search">
          <p className="searchButton">Search for your trip: </p>
          <input
            value={searchParams.get("filter") || ""}
            onChange={(event) => {
              let filter = event.target.value;
              if (filter) {
                setSearchParams({ filter });
              } else {
                setSearchParams({});
              }
            }}
          />
        </div>
        <br />
        <div>
          <div className="stocks-container">
            <List sx={{ width: 550, bgcolor: "background.paper" }}>
              {stocks
                .filter((stock) => {
                  let filter = searchParams.get("filter");
                  if (!filter) return true;
                  let name = stock.companyName;
                  return name === filter;
                })
                .map((stock: any) => (
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
                      <h6 className="middleC">{stock.companyName}</h6>
                    </div>
                    <div className="right">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={12}>
                          <h5>${stock.latestPrice}</h5>
                        </Grid>
                        <Grid item xs={4} container spacing={1}>
                          <h6
                            className={stock.changePercent > 0 ? "good" : "bad"}
                          >
                            {stock.change}
                          </h6>
                        </Grid>
                        <Grid item xs={4}>
                          <h6
                            className={
                              stock.changePercent > 0 ? "good1" : "bad1"
                            }
                          >
                            {(stock.changePercent * 100).toFixed(2)}%
                          </h6>
                        </Grid>
                      </Grid>
                    </div>

                    {/* <div className="right">
                    <h5>${stock.latestPrice}</h5>
                  <div className="right1">
                    <h6 className={stock.changePercent > 0 ? "good" : "bad"}>
                      {stock.changePercent}
                    </h6>
                    </div>
                                      <div className="right2">

                    <h6 className={stock.changePercent > 0 ? "good" : "bad"}>
                      {stock.change}
                    </h6>
                    </div> */}
                    {/* </div> */}
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
