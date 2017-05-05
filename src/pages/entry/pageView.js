import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const CustomEvent = ({entry}) => (
    <List>
                <Subheader>
                    <b>General</b>
                </Subheader>
                <ListItem key={'d'+entry.id} primaryText={entry.timestamp} secondaryText={"Date"}/>
                <ListItem key={'op'+entry.id} primaryText={entry.operation ? entry.operation.name: 'N/A'} secondaryText={"Operation"}/>
                <Divider />
                <Subheader>
                    <b>Page View</b>
                </Subheader>
                <ListItem key={'n'+entry.id} primaryText={entry.pageView.name} secondaryText={"Name"}/>
                <ListItem key={'url'+entry.id} primaryText={entry.pageView.url} secondaryText={"URL"}/>
                <Divider />
                <Subheader>
                    <b>Custom Dimensions</b>
                </Subheader>
                {
                    entry.customDimensions ? 
                    Object.keys(entry.customDimensions).map(key => (
                        <ListItem key={key+''+entry.id} primaryText={entry.customDimensions[key]} secondaryText={key}  />
                    )) : ''
                }    
            </List>
);

export default CustomEvent;