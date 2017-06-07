import fetch from 'isomorphic-fetch';
import { loadingAIs, loadingAIsFinished, loadingAIsFailed } from './ui';
import { aiLogsLoaded, aiStatsLoaded, addAIGroup as aag, removeAiApp as raa, addAIApp } from './ai';
import { currentLoaded } from './current';
import { saveAllApps, getAll, removeById, saveApp as saveAiApp } from '../repository'
import _ from 'lodash';

export const LOAD_AI_LOGS = 'LOAD_AI_LOGS';
export const LOAD_AI_LOGS_SUCCEEDED = 'LOAD_AI_LOGS_SUCCEEDED';
export const LOAD_AI_LOGS_FAILED = 'LOAD_AI_LOGS_FAILED';


export function loadAILogs(appId, appKey, types, timeSpan, top, skip, refresh) {
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

            dispatch(aiLogsLoaded(appId, sorted, types, timeSpan, top, skip, refresh));
            dispatch(loadingAIsFinished());
        }).catch(() => {
            dispatch(loadingAIsFailed());
        }).then(() => {
            const countUrl = `https://api.applicationinsights.io/beta/apps/${appId}/events/exceptions?timespan=${timeSpan}&$select=id&$count=true`;
            fetch(countUrl, {headers: apiHeaders})
                .then(data => {
                    return data.json().then((resp) => dispatch(aiStatsLoaded(appId, resp['@odata.count'])));
                });
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

export function addAIGroup(code) {
    return function(dispatch) {

        dispatch(loadingAIs());

        var url = `https://api-ai-explorer.azurewebsites.net/groups/${code}`;

        fetch(url)
            .then(data => {
                return data.json().then(resp => {
                    return saveAllApps(resp.apps)
                        .then(() => dispatch(aag(resp.apps)))
                        .then(() => dispatch(loadingAIsFinished()))
                        .catch(() => dispatch(aag(resp.apps)));
                });
            }).catch(() => {
                dispatch(loadingAIsFailed());
            });
    }
};

const isLoaded = false;

export function loadAiApps() {
    return function(dispatch) {
        
        if(isLoaded)
            return;

        dispatch(loadingAIs());

        getAll().then(apps => {
            dispatch(aag(apps));
            dispatch(loadingAIsFinished());

            isLoaded = true;
        }).catch(() => dispatch(loadingAIsFinished()));
    }
}

export function removeAiApp(appId) {
    return function(dispatch) {
        dispatch(loadingAIs());

        removeById(appId).then(() => {
            dispatch(raa(appId));
            dispatch(loadingAIsFinished());
        });
    }
}

export function saveApp(name, id, key) {
    return function(dispatch) {
        dispatch(loadingAIs());

        saveAiApp(name, id, key)
            .then(() => {
                dispatch(addAIApp(id, key, name));
                dispatch(loadingAIsFinished());
            });
    }
}