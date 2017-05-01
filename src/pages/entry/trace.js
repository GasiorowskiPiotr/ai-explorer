// for trace:
/*
"id": "a96d4640-2ea2-11e7-a801-0d9d5a5858af",
      "type": "trace",
      "timestamp": "2017-05-01T19:15:57.566Z",
      "operation": {
        "name": "POST /FabrikamProd/ServiceTickets/Create",
      },
      "trace": {
        "message": "New Request Received",
        "severityLevel": 0
      },
      "client": {
        "model": null,
        "os": null,
        "type": "PC",
        "browser": null,
        "ip": "207.46.14.0",
        "city": "Chicago",
        "stateOrProvince": "Illinois",
        "countryOrRegion": "United States"
      }
    },
*/
import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const Trace = ({entry}) => (

    <List>
                <Subheader>
                    <b>General</b>
                </Subheader>
                <ListItem key={'d'+entry.id} primaryText={entry.timestamp} secondaryText={"Date"}/>
                <ListItem key={'op'+entry.id} primaryText={entry.operation ? entry.operation.name: 'N/A'} secondaryText={"Operation"}/>
                <Divider />
                <Subheader>
                    <b>Trace</b>
                </Subheader>
                <ListItem key={'m'+entry.id} primaryText={entry.trace.message} secondaryText={"Message"}/>
                <ListItem key={'sl'+entry.id} primaryText={entry.trace.severityLevel} secondaryText={"Severity Level"}/>
                <Divider />
                <Subheader>
                    <b>Custom Dimensions</b>
                </Subheader>
                { Object.keys(entry.customDimensions).map(key => (
                        <ListItem key={key+''+entry.id} primaryText={entry.customDimensions[key]} secondaryText={key}  />
                    )) }    
            </List>
);

export default Trace;