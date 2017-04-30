import fetch from 'isomorphic-fetch';
import { loadingAIs, loadingAIsFinished } from './ui';
import { aiLogsLoaded } from './ai';
import { currentLoaded } from './current';
import _ from 'lodash';

export const LOAD_AI_LOGS = 'LOAD_AI_LOGS';
export const LOAD_AI_LOGS_SUCCEEDED = 'LOAD_AI_LOGS_SUCCEEDED';
export const LOAD_AI_LOGS_FAILED = 'LOAD_AI_LOGS_FAILED';


export function loadAILogs(appId, appKey, types, timeSpan) {
    return function(dispatch) {

        dispatch(loadingAIs());

        var apiHeaders = new Headers();
        apiHeaders.set('x-api-key', appKey);

        var promises = _.map(types, type => `https://api.applicationinsights.io/beta/apps/${appId}/events/${type}?timespan=${timeSpan}&$top=100`)
            .map(url => new Promise((resolve, reject) => {
                fetch(url, { headers: apiHeaders})
                    .then(data => {
                        return data.json().then((resp) => resolve(resp.value));
                    })
                    .catch(reject);
            }));  

        Promise.all(promises).then((items) => {
            
            var concat = _.flatMap(items);
            var sorted = _.sortBy(concat, ['timestamp']);

            dispatch(aiLogsLoaded(appId, sorted));
            dispatch(loadingAIsFinished());
        });
    }
};

export function loadAIEntry(appId, appKey, type, entryId) {
    return function(dispatch) {

        dispatch(loadingAIs());

        var apiHeaders = new Headers();
        apiHeaders.set('x-api-key', appKey);

        var url = `https://api.applicationinsights.io/beta/apps/${appId}/events/$all/${entryId}`;

        fetch(url, { headers: apiHeaders })
            .then(data => {
                data.json().then(items => {
                    dispatch(currentLoaded(items));
                    dispatch(loadingAIsFinished());
                });
                
            });

    }
};