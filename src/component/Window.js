import React from 'react'
import ComponentLayer from './layer/componentLayer'
import ContextLayer from './layer/contextLayer'
import PropertyLayer from './layer/propertyLayer'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DragStatus } from '../common/constant'

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        padding: 10,
    },
    componentLayer: {
        width: 200,
        height: '100%',
    },
    contextLayer: {
        width: 'auto',
        height: '100%',
    },
    propertyLayer: {
        width: 200,
        height: '100%',
    }
});

class Window extends React.Component {
    constructor(props) {
        super(props);
        const COMPONENT_LAYER_DEFAULT_WIDTH = 200
        const PROPERTY_LAYER_DEFAULT_WIDTH = 200
        this.state = {
            componentLayer: {
                width: COMPONENT_LAYER_DEFAULT_WIDTH,
                height: '100%',
                x: 0,
                y: 0
            },
            contextLayer: {
                width: window.innerWidth - COMPONENT_LAYER_DEFAULT_WIDTH - PROPERTY_LAYER_DEFAULT_WIDTH,
                height: '100%',
                x: COMPONENT_LAYER_DEFAULT_WIDTH,
                y: 0
            },
            propertyLayer: {
                width: PROPERTY_LAYER_DEFAULT_WIDTH,
                height: '100%',
                x: window.innerWidth - PROPERTY_LAYER_DEFAULT_WIDTH,
                y: 0
            },
            drag: {
                status: DragEvent.NONE,
                onDragStart: { event: undefined, data: undefined },
                onDrag: { event: undefined, data: undefined },
                onDragStop: { event: undefined, data: undefined }
            }
        }
    }

    syncComponentLayerWidth(rect) {
        var currentLayers = Object.assign(this.state)
        currentLayers.componentLayer = rect
        currentLayers.contextLayer.width = window.innerWidth - rect.width - currentLayers.propertyLayer.width
        currentLayers.contextLayer.x = rect.width
        this.setState(currentLayers)
    }
    syncPropertyLayerWidth(rect) {
        var currentLayers = Object.assign(this.state)
        currentLayers.propertyLayer = rect
        currentLayers.contextLayer.width = window.innerWidth - currentLayers.componentLayer.width - rect.width
        this.setState(currentLayers)
    }

    syncOnDragStart(id, event, data) {
        var currentState = Object.assign(this.state)
        currentState.drag.status = DragStatus.START;
        currentState.drag.onDragStart = { id: id, event: event, data: data }
        this.setState(currentState)
    }
    syncOnDrag(id, event, data) {
        var currentState = Object.assign(this.state)
        currentState.drag.status = DragStatus.DRAG;
        currentState.drag.onDrag = { id: id, event: event, data: Object.assign(data) }
        this.setState(currentState)
    }
    syncOnDragStop(id, event, data) {
        var currentState = Object.assign(this.state)
        currentState.drag.status = DragStatus.STOP;
        currentState.drag.onDragStop = { id: id, event: event, data: Object.assign(data) }
        this.setState(currentState)
    }

    render() {
        const { classes } = this.props;

        return <Paper className={classes.root}>
            <ComponentLayer onSyncResize={this.syncComponentLayerWidth.bind(this)} rect={this.state.componentLayer}
                onSyncDragStart={this.syncOnDragStart.bind(this)}
                onSyncDrag={this.syncOnDrag.bind(this)}
                onSyncDragStop={this.syncOnDragStop.bind(this)} />
            <ContextLayer rect={this.state.contextLayer} drag={this.state.drag} />
            <PropertyLayer onSyncResize={this.syncPropertyLayerWidth.bind(this)} rect={this.state.propertyLayer}
                onSyncDragStart={this.syncOnDragStart.bind(this)} />
        </Paper>
    }
}


export default withStyles(styles)(Window);