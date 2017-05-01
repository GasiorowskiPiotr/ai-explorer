import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const Dependency = ({entry}) => (
    <List>
                <Subheader>
                    <b>General</b>
                </Subheader>
                <ListItem primaryText={entry.timestamp} secondaryText={"Date"}/>
                <ListItem primaryText={entry.operation ? entry.operation.name: 'N/A'} secondaryText={"Operation"}/>
                <Divider />
                <Subheader>
                    <b>Dependency</b>
                </Subheader>
                <ListItem primaryText={entry.dependency.target} secondaryText={"Target"}/>
                <ListItem primaryText={entry.dependency.data} secondaryText={"Data"}/>
                <ListItem primaryText={entry.dependency.success} secondaryText={"Success?"}/>
                <ListItem primaryText={entry.dependency.duration} secondaryText={"Duration [ms]"}/>
                <ListItem primaryText={entry.dependency.resultCode} secondaryText={"Result Code"}/>
                <ListItem primaryText={entry.dependency.type} secondaryText={"Type"}/>
                <ListItem primaryText={entry.dependency.name} secondaryText={"Name"}/>
                <Divider />
                <Subheader>
                    <b>Custom Dimensions</b>
                </Subheader>
                { Object.keys(entry.customDimensions).map(key => (
                        <ListItem primaryText={entry.customDimensions[key]} secondaryText={key}  />
                    )) }    
            </List>
);

export default Dependency;