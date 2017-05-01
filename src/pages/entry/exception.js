import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import sortBy from 'lodash/sortBy'; 

const formatStackTrace = (details) => {
    return (<ul>
        {sortBy(details[0].parsedStack, ['level']).map(sf => (<li>{ sf.method }</li>))}
    </ul>) 
};

const Exception = ({entry}) => (
    <List>
                <Subheader>
                    <b>General</b>
                </Subheader>
                <ListItem key={'d'+entry.id} primaryText={entry.timestamp} secondaryText={"Date"}/>
                <ListItem key={'op'+entry.id} primaryText={entry.operation ? entry.operation.name: 'N/A'} secondaryText={"Operation"}/>
                <Divider />
                <Subheader>
                    <b>Exception</b>
                </Subheader>
                <ListItem key={'pid'+entry.id} primaryText={entry.exception.problemId} secondaryText={"Problem ID"}/>
                <ListItem key={'ext'+entry.id} primaryText={entry.exception.type} secondaryText={"Exception Type"}/>
                <ListItem key={'om'+entry.id} primaryText={entry.exception.outerMessage} secondaryText={"Outer Message"}/>
                <ListItem key={'im'+entry.id} primaryText={entry.exception.innermostMessage} secondaryText={"Innermost Message"}/>
                <ListItem key={'st'+entry.id} primaryText={formatStackTrace(entry.exception.details)} secondaryText={"StackTrace"}/>
                <Divider />
                <Subheader>
                    <b>Custom Dimensions</b>
                </Subheader>
                { Object.keys(entry.customDimensions).map(key => (
                        <ListItem key={key+''+entry.id} primaryText={entry.customDimensions[key]} secondaryText={key}  />
                    )) }    
            </List>
);

export default Exception;