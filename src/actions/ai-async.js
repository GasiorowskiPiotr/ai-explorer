import fetch from 'isomorphic-fetch';
import { loadingAIs, loadingAIsFinished, loadingAIsFailed } from './ui';
import { aiLogsLoaded } from './ai';
import { currentLoaded } from './current';
import _ from 'lodash';

export const LOAD_AI_LOGS = 'LOAD_AI_LOGS';
export const LOAD_AI_LOGS_SUCCEEDED = 'LOAD_AI_LOGS_SUCCEEDED';
export const LOAD_AI_LOGS_FAILED = 'LOAD_AI_LOGS_FAILED';


export function loadAILogs(appId, appKey, types, timeSpan, top, skip) {
    return function(dispatch) {

        dispatch(loadingAIs());

        var apiHeaders = new Headers();
        apiHeaders.set('x-api-key', appKey);

        var promises = _.map(types, type => `https://api.applicationinsights.io/beta/apps/${appId}/events/${type}?timespan=${timeSpan}&$top=${top}&$skip=${skip}`)
            .map(url => new Promise((resolve, reject) => {
                fetch(url, { headers: apiHeaders})
                    .then(data => {
                        return data.json().then((resp) => resolve(resp.value)).catch(reject);
                    })
                    .catch(reject);
            }));  

        Promise.all(promises).then((items) => {
            
            var concat = _.flatMap(items);
            var sorted = _.sortBy(concat, ['timestamp']);
            sorted = _.reverse(sorted);

            dispatch(aiLogsLoaded(appId, sorted, top, skip));
            dispatch(loadingAIsFinished());
        }).catch(() => {
            dispatch(loadingAIsFailed());
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
                    dispatch(currentLoaded(items.value[0]));
                    dispatch(loadingAIsFinished());
                }).catch(() => {
                    dispatch(loadingAIsFailed());
                });
            }).catch(() => {
                dispatch(loadingAIsFailed());
            });

    }
};