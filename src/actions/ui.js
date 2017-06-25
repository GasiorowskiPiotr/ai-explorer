export const GO_TO_AI_LIST = 'GO_TO_AI_LIST'; //deprecated
export const GO_TO_ADD_AI = 'GO_TO_ADD_AI'; // deprecated
export const GO_TO_AI = 'GO_TO_AI'; // deprecated

export const MESSAGE_HIDDEN = 'MESSAGE_HIDDEN';
export function messageHidden() {
    return {
        type: MESSAGE_HIDDEN
    };
}

export const LOADING_AIS = 'LOADING_AIS';
export function loadingAIs() {
    return {
        type: LOADING_AIS
    };
}

export const LOADING_AIS_FINISHED = 'LOADING_AIS_FINISHED';
export function loadingAIsFinished() {
    return {
        type: LOADING_AIS_FINISHED
    };
}

export const LOADING_AIS_FAILED = 'LOADING_AIS_FAILED';
export function loadingAIsFailed(message = null) {
    return {
        type: LOADING_AIS_FAILED,
        message
    };
}

// deprecated
export function goToAiList() {
    return {
        type: GO_TO_AI_LIST
    };
}

// deprecated
export function goToAddAi() {
    return {
        type: GO_TO_ADD_AI
    };
}

// deprecated
export function goToAi(appId) {
    return {
        type: GO_TO_AI,
        appId
    };
}