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
                    <b>Page View</b>
                </Subheader>
                <ListItem primaryText={entry.pageView.name} secondaryText={"Name"}/>
                <ListItem primaryText={entry.pageView.url} secondaryText={"URL"}/>
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