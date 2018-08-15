import React from 'react'
import ComponentLayer from './layer/componentLayer'
import ContextLayer from './layer/contextLayer'
import PropertyLayer from './layer/propertyLayer'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    constructor() {
        super();
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
        }
    }

    syncComponentLayerWidth(rect) {
        var currentLayers = this.state
        currentLayers.componentLayer = rect
        currentLayers.contextLayer.width = window.innerWidth - rect.width - currentLayers.propertyLayer.width
        currentLayers.contextLayer.x = rect.width
        this.setState(currentLayers)
    }
    syncPropertyLayerWidth(rect) {
        var currentLayers = this.state
        currentLayers.propertyLayer = rect
        currentLayers.contextLayer.width = window.innerWidth - currentLayers.componentLayer.width - rect.width
        this.setState(currentLayers)
    }

    render() {
        const { classes } = this.props;
        return <Paper className={classes.root}>
            <ComponentLayer onSyncResize={this.syncComponentLayerWidth.bind(this)} rect={this.state.componentLayer}/>
            <ContextLayer rect={this.state.contextLayer}/>
            <PropertyLayer onSyncResize={this.syncPropertyLayerWidth.bind(this)} rect={this.state.propertyLayer}/>
        </Paper>
    }
}


export default withStyles(styles)(Window);