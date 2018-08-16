import React from "react";
import { Rnd } from "react-rnd";
import PropTypes from 'prop-types';
import Reward from '../pion-component/reward'
import { DragStatus } from '../../common/constant'

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

class ContextLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: {

            }
        }
        this.onDragStart = this.onDragStart.bind(this)
        this.onDrag = this.onDrag.bind(this)
        this.onDragStop = this.onDragStop.bind(this)
        this.createRndObject = this.createRndObject.bind(this)
    }

    createRndObject(id) {
        return (<Reward rect={{
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }}
            key={id}
            id={id}
            ref={id}
            onDrag={this.onDrag.bind(this)}
            onDragStop={this.onDragStop.bind(this)}
            onDragStart={this.onDragStart.bind(this)} />)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.drag.status === DragStatus.START) {
            if (this.state.components[nextProps.drag.onDragStart.id] === undefined) {
                const currentState = Object.assign(this.state)
                currentState.components[nextProps.drag.onDragStart.id] = this.createRndObject(nextProps.drag.onDragStart.id)
                this.setState(currentState)
            }
        }
        else if (nextProps.drag.status === DragStatus.DRAG) {
            console.log(this.state.components)
        }
        else if (nextProps.drag.status === DragStatus.STOP) {
            if (nextProps.drag.onDragStop.data.x < this.props.rect.x) {
                var currentState = Object.assign(this.state)
                if (currentState.components[nextProps.drag.onDragStart.id] !== undefined) {
                    currentState.components[nextProps.drag.onDragStart.id] = undefined
                    delete currentState.components[nextProps.drag.onDragStart.id]
                    this.setState(currentState)
                }
            }
        }
    }

    onDragStart(id, event, data) {
        console.log("onDragStart", id, data)
    }

    onDrag(id, event, data) {
        console.log("onDrag", id, data)
    }

    onDragStop(id, event, data) {
        console.log("onDrag", id, data)
    }

    render() {
        const renderComponents = [];
        Object.keys(this.state.components).map((key, index) => {
            renderComponents.push(this.state.components[key])
        })
        
        return (
            <Rnd
                disableDragging={true}
                style={style}
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
              {/* {renderComponents.map((component)=>{
                  return component
              })} */}
            </Rnd>
        );
    }
}

ContextLayer.propTypes = {
    rect: PropTypes.object,
    drag: PropTypes.object
    // rect: PropTypes.objectOf({
    //     x: PropTypes.number.isRequired,
    //     y: PropTypes.number.isRequired,
    //     width: PropTypes.number.isRequired,
    //     height: PropTypes.number.isRequired
    // }),
    // drag: PropTypes.objectOf({
    //     status: PropTypes.number,
    //     onDragStart: PropTypes.objectOf({
    //         id: PropTypes.string,
    //         event: PropTypes.object,
    //         data: PropTypes.object
    //     }),
    //     onDrag: PropTypes.objectOf({
    //         id: PropTypes.string,
    //         event: PropTypes.object,
    //         data: PropTypes.object
    //     }),
    //     onDragStop: PropTypes.objectOf({
    //         id: PropTypes.string,
    //         event: PropTypes.object,
    //         data: PropTypes.object
    //     })
    // })
};

export default ContextLayer