import React from "react";
import { Rnd } from "react-rnd";
import PropTypes from 'prop-types';

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

class ContextLayer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Rnd
                disableDragging={true}
                style={style}
                onDrag={(e,data)=>{
                    console.log(e)
                }}
                size={{ width: this.props.rect.width, height: this.props.rect.height }}
                position={{ x: this.props.rect.x, y: this.props.rect.y }}
                enableResizing={
                    {
                        bottom: false,
                        bottomLeft: false,
                        bottomRight: false,
                        left: false,
                        right: false,
                        top: false,
                        topLeft: false,
                        topRight: false
                    }
                }
            >
                ContextLayer
      </Rnd>
        );
    }
}

ContextLayer.propTypes = {
    rect: PropTypes.objectOf({
        x : PropTypes.number.isRequired,
        y : PropTypes.number.isRequired,
        width : PropTypes.number.isRequired,
        height : PropTypes.number.isRequired
    })
};

export default ContextLayer