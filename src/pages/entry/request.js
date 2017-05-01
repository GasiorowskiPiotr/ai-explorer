import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const Request = ({entry}) => (
    <List>
                <Subheader>
                    <b>General</b>
                </Subheader>
                <ListItem primaryText={entry.timestamp} secondaryText={"Date"}/>
                <ListItem primaryText={entry.operation ? entry.operation.name: 'N/A'} secondaryText={"Operation"}/>
                <Divider />
                <Subheader>
                    <b>Request</b>
                </Subheader>
                <ListItem primaryText={entry.request.name} secondaryText={"Name"}/>
                <ListItem primaryText={entry.request.url} secondaryText={"URL"}/>
                <ListItem primaryText={entry.request.success} secondaryText={"Success?"}/>
                <ListItem primaryText={entry.request.duration} secondaryText={"Duration [ms]"}/>
                <ListItem primaryText={entry.request.resultCode} secondaryText={"HTTP Status Code"}/>
                <Divider />
                <Subheader>
                    <b>Custom Dimensions</b>
                </Subheader>
                { Object.keys(entry.customDimensions).map(key => (
                        <ListItem primaryText={entry.customDimensions[key]} secondaryText={key}  />
                    )) }    
            </List>
);

export default Request;