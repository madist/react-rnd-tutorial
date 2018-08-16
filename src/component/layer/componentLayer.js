import React from "react";
import { Rnd } from "react-rnd";
import PropTypes from 'prop-types';
import { ComponentRect } from '../../common/constant'
import Reward from '../pion-component/reward';
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

class ComponentLayer extends React.Component {
    constructor(props) {
        super(props);
    }
    onDragStart(id, event, data) {
        this.props.onSyncDragStart(id, event, data)
    }
    onDrag(id, event, data) {
        this.props.onSyncDrag(id, event, data)
    }
    onDragStop(id, event, data) {
        this.refs[id].init()
        this.props.onSyncDragStop(id, event, data)
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
                        left: false,
                        right: true,
                        top: false,
                        topLeft: false,
                        topRight: false
                    }
                }
                onResize={(e, direction, ref, delta, position) => {
                    const rect = {
                        x: position.x,
                        y: position.y,
                        width: Number(ref.style.width.replace('px', '')),
                        height: Number(ref.style.height.replace('px', ''))
                    }
                    this.props.onSyncResize(rect)
                }}
            >
                <Reward ref={"reward_1"} id={"reward_1"} onDragStart={this.onDragStart.bind(this)} onDrag={this.onDrag.bind(this)} onDragStop={this.onDragStop.bind(this)} />
                {/* <Achievement onDragStart={this.onDragStart.bind(this)} onDrag={this.onDrag.bind(this)} onDragStop={this.onDragStop.bind(this)} ></Achievement> */}
            </Rnd>
        );
    }
}

ComponentLayer.propTypes = {
    rect: PropTypes.objectOf({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }),
    onSyncResize: PropTypes.func.isRequired,
    onSyncDragStart: PropTypes.func.isRequired,
    onSyncDrag: PropTypes.func.isRequired,
    onSyncDragStop: PropTypes.func.isRequired

};

export default ComponentLayer