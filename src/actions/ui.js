export const GO_TO_AI_LIST = 'GO_TO_AI_LIST';
export const GO_TO_ADD_AI = 'GO_TO_ADD_AI';
export const GO_TO_AI = 'GO_TO_AI';

export function goToAiList() {
    return {
        type: GO_TO_AI_LIST
    };
}

export function goToAddAi() {
    return {
        type: GO_TO_ADD_AI
    };
}

export function goToAi(appId) {
    return {
        type: GO_TO_AI,
        appId
    };
}