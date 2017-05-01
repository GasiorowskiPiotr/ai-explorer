import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const Dependency = ({entry}) => (
    <List>
                <Subheader>
                    <b>General</b>
                </Subheader>
                <ListItem key={'d'+entry.id} primaryText={entry.timestamp} secondaryText={"Date"}/>
                <ListItem key={'op'+entry.id} primaryText={entry.operation ? entry.operation.name: 'N/A'} secondaryText={"Operation"}/>
                <Divider />
                <Subheader>
                    <b>Dependency</b>
                </Subheader>
                <ListItem key={'t'+entry.id} primaryText={entry.dependency.target} secondaryText={"Target"}/>
                <ListItem key={'_'+entry.id} primaryText={entry.dependency.data} secondaryText={"Data"}/>
                <ListItem key={'s'+entry.id} primaryText={entry.dependency.success} secondaryText={"Success?"}/>
                <ListItem key={'l'+entry.id} primaryText={entry.dependency.duration} secondaryText={"Duration [ms]"}/>
                <ListItem key={'res'+entry.id} primaryText={entry.dependency.resultCode} secondaryText={"Result Code"}/>
                <ListItem key={'tp'+entry.id} primaryText={entry.dependency.type} secondaryText={"Type"}/>
                <ListItem key={'n'+entry.id} primaryText={entry.dependency.name} secondaryText={"Name"}/>
                <Divider />
                <Subheader>
                    <b>Custom Dimensions</b>
                </Subheader>
                { Object.keys(entry.customDimensions).map(key => (
                        <ListItem key={key+''+entry.id} primaryText={entry.customDimensions[key]} secondaryText={key}  />
                    )) }    
            </List>
);

export default Dependency;