import React from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};
const disableResizing = {
  bottom: false,
  bottomLeft: false,
  bottomRight: false,
  left: false,
  right: false,
  top: false,
  topLeft: false,
  topRight: false
}
export default class Achievement extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 80,
      height: 80,
      x: 100,
      y: 10
    };
  }

  render() {
    return (
      <Rnd
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDragStart={(e,data)=>{
          console.log("ondrag",e,data)
        }}
        onDrag={(e,data)=>{
          console.log("ondrag",e,data)
        }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        enableResizing={disableResizing}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            x:position.x,
            y:position.y
          });
        }}
      >
        <small>Achievement</small>
      </Rnd>
    );
  }
}
