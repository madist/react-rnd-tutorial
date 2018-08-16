import React from "react";
import { Rnd } from "react-rnd";
import PropTypes from 'prop-types';
import { ComponentRect } from '../../common/constant'
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

class Reward extends React.Component {
  constructor(props) {
    super(props);
    console.log(ComponentRect.Reward)
    this.init = this.init.bind(this)
    this.state = ComponentRect.Reward
  }
  init() {
    this.setState(ComponentRect.Reward)
  }
  render() {
    return (
      <Rnd
        id={`${this.props.id}`}
        ref={this.props.ref}
        style={style}
        dragGrid={[1, 1]}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDragStart={(e, d) => {
          this.props.onDragStart(this.props.id, e, d)
        }}
        onDrag={(e, d) => {
          this.props.onDrag(this.props.id, e, d)
        }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
          this.props.onDragStop(this.props.id, e, d)
        }}
        enableResizing={disableResizing}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            x: position.x,
            y: position.y
          });
        }}
      >
        <small>Reward</small>
      </Rnd>
    );
  }
}

Reward.propTypes = {
  id: PropTypes.string.isRequired,
  ref: PropTypes.string.isRequired,
  rect: PropTypes.objectOf({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragStop: PropTypes.func.isRequired
};

export default Reward