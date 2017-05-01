/*
{
      "id": "187970f0-2e9b-11e7-839b-75e32f021b2b",
      "type": "customEvent",
      "timestamp": "2017-05-01T18:19:36.022Z",
      "customDimensions": {
        "DeveloperMode": "true",
        "ServiceProfilerContent": "v1|westus2-6eesb2fclnyj2|5a2e4e0c-e136-4a15-9824-90ba859b0a89|rd00155da9ac15fabrikamfiberapp|4796|2017-05-01T18:18:09.9822478Z|//7/58/1/|2017-05-01T18:19:36.0225571Z|2017-05-01T18:19:36.1277888Z",
        "ServiceProfilerVersion": "v1"
      },
      "operation": {
        "name": "",
        "id": "qVIeFic0vE8=",
        "parentId": "qVIeFic0vE8=",
        "syntheticSource": null
      },
      "customEvent": {
        "name": "ServiceProfilerSample"
      },
    },
*/
import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const CustomEvent = ({entry}) => (
    <List>
                <Subheader>
                    <b>General</b>
                </Subheader>
                <ListItem primaryText={entry.timestamp} secondaryText={"Date"}/>
                <ListItem primaryText={entry.operation ? entry.operation.name: 'N/A'} secondaryText={"Operation"}/>
                <Divider />
                <Subheader>
                    <b>Custom Event</b>
                </Subheader>
                <ListItem primaryText={entry.customEvent.name} secondaryText={"Event"}/>
                <Divider />
                <Subheader>
                    <b>Custom Dimensions</b>
                </Subheader>
                { Object.keys(entry.customDimensions).map(key => (
                        <ListItem primaryText={entry.customDimensions[key]} secondaryText={key}  />
                    )) }    
            </List>
);

export default CustomEvent;