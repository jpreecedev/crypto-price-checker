import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bitcoin: 0,
      "bitcoin-cash": 0,
      "bitcoin-gold": 0,
      ethereum: 0,
      dash: 0,
      verge: 0,
      ripple: 0,
      iota: 0,
      neo: 0,
      monero: 0,
      zcash: 0,
      tron: 0,
      stellar: 0,
      appcoins: 0
    };
  }

  async componentDidMount() {
    const coins = Object.keys(this.state);
    const promises = [];

    coins.forEach(coin => {
      const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
      promises.push(axios.get(url));
    });

    axios.all(promises).then(results => {
      results.forEach(result => {
        this.setState({
          [result.data.id]: result.data.market_data.current_price.usd
        });
      });
    });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.state).map(key => {
            return (
              <tr>
                <td>{key}</td>
                <td>{this.state[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

render(<App />, document.getElementById("root"));
