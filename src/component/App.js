import React from "react";
import Window from './Window'



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 200,
      height: 200,
      x: 10,
      y: 10
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Window></Window>
    );
  }
}

export default App;