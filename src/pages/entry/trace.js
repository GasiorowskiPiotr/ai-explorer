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
                {
                    entry.customDimensions ? 
                        Object.keys(entry.customDimensions).map(key => (
                            <ListItem key={key+''+entry.id} primaryText={entry.customDimensions[key]} secondaryText={key}  />
                        )) : ''
                     
                }    
            </List>
);

export default Trace;