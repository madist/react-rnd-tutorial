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

class PropertyLayer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Rnd
                disableDragging={true}
                style={style}
                maxWidth={400}
                minWidth={200}
                size={{ width: this.props.rect.width, height: this.props.rect.height }}
                position={{ x: this.props.rect.x, y: this.props.rect.y }}
                enableResizing={
                    {
                        bottom: false,
                        bottomLeft: false,
                        bottomRight: false,
                        left: true,
                        right: false,
                        top: false,
                        topLeft: false,
                        topRight: false
                    }
                }
                onResize={(e, direction, ref, delta, position) => {
                    const rect = {
                        x: position.x,
                        y: position.y, 
                        width: Number(ref.style.width.replace('px','')),
                        height: Number(ref.style.height.replace('px',''))
                    }
                    this.props.onSyncResize(rect)
                }}
            >
            Property
            Window
      </Rnd>
        );
    }
}

PropertyLayer.propTypes = {
    rect: PropTypes.objectOf({
        x : PropTypes.number.isRequired,
        y : PropTypes.number.isRequired,
        width : PropTypes.number.isRequired,
        height : PropTypes.number.isRequired
    }),
    onSyncResize : PropTypes.func.isRequired
};

export default PropertyLayer