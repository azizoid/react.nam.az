import React from "react";
import { TClock, TClockState } from "../assist/types";

class Clock extends React.Component<TClock, TClockState> {
  constructor(props: TClock) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString("az", {
        timeZone: "Asia/Baku",
        hour12: false,
      }),
    };
  }
  private intervalID: any;

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString("az", {
        timeZone: "Asia/Baku",
        hour12: false,
      }),
    });
  }
  render() {
    return <p className="App-clock">{this.state.time}</p>;
  }
}

export default Clock;
