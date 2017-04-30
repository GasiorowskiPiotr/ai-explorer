export const CURRENT_LOADED = 'CURRENT_LOADED';
export function currentLoaded(fullLog) {
    return {
        type: CURRENT_LOADED,
        entry: fullLog
    };
}