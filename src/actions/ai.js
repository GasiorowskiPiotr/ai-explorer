export const ADD_AI_APP = 'ADD_AI_APP';
export const REMOVE_AI_APP = 'REMOVE_AI_APP';
export const AI_LOGS_LOADED = 'AI_LOGS_LOADED';
export const AI_STATS_LOADED = 'AI_STATS_LOADED';

export function addAIApp(appId, appKey, appName) {
    return {
        type: ADD_AI_APP,
        app: {
            appId,
            appKey,
            appName
        }
    };
};

export function removeAiApp(appId) {
    return {
        type: REMOVE_AI_APP,
        app: {
            appId
        }
    };
};

export function aiLogsLoaded(appId, logs, types, timeSpan, top, skip, reload = false) {
    return {
        type: AI_LOGS_LOADED,
        app: {
            appId
        },
        logs,
        top,
        skip,
        reload,
        types,
        timeSpan
    };
};

export function aiStatsLoaded(appId, exceptions) {
    return {
        type: AI_STATS_LOADED,
        appId,
        exceptions
    };
}