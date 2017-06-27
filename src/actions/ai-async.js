import fetch from 'isomorphic-fetch';
import { loadingAIs, loadingAIsFinished, loadingAIsFailed } from './ui';
import { aiLogsLoaded, aiStatsLoaded, addAIGroup as aag, removeAiApp as raa, addAIApp } from './ai';
import { saveAllApps, getAll, removeById, saveApp as saveAiApp, saveGroupKey, getGroupKey } from '../repository'
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

export function addAIGroup(code) {
    return function(dispatch) {

        dispatch(loadingAIs());

        saveGroupKey(code).then(() => {

            var url = `https://api-ai-explorer.azurewebsites.net/groups/${code}`;

            return fetch(url)
                .then(data => {
                    return data.json().then(resp => {
                        dispatch(aag(resp.apps));

                        return saveAllApps(resp.apps)
                            .then(() => dispatch(loadingAIsFinished()));
                    });
                }).catch(() => {
                    dispatch(loadingAIsFailed());
                });
        }).catch(() => {
            dispatch(loadingAIsFailed('Adding AI Group failed. This may be caused by lack of connectivity, legacy browser or private mode.'));
        });
    }
};

let isLoaded = false;

export function loadAiApps() {
    return function(dispatch) {
        
        if(isLoaded)
            return;

        dispatch(loadingAIs());

        getAll().then(apps => {

            isLoaded = true;

            if(apps.length > 0) {
                dispatch(aag(apps));
                dispatch(loadingAIsFinished());

                return Promise.resolve();

            } else {
                return getGroupKey().then((key) => {

                    if(key) {
                        dispatch(addAIGroup(key));
                    } else {
                        dispatch(loadingAIsFinished());
                    }
                });
            }
            
        }).catch(() => dispatch(loadingAIsFailed('Loading AI Apps failed. This may be caused by lack of connectivity, legacy browser or private mode.')));
    }
}

export function removeAiApp(appId) {
    return function(dispatch) {
        dispatch(loadingAIs());
        dispatch(raa(appId));

        removeById(appId).then(() => {
            dispatch(loadingAIsFinished());
        }).catch(() => {
            dispatch(loadingAIsFailed('Removing AI App failed. This may be caused by legacy browser or private mode.'));
        });
    }
}

export function saveApp(name, id, key) {
    return function(dispatch) {
        dispatch(loadingAIs());

        dispatch(addAIApp(id, key, name));

        saveAiApp(name, id, key)
            .then(() => {
                dispatch(loadingAIsFinished());
            })
            .catch(() => {
                dispatch(loadingAIsFailed('Adding AI App failed. This may be caused by legacy browser or private mode.'));
            });
    }
}