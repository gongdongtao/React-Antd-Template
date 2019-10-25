export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_DEFAULTSETTINGS = 'SET_DEFAULTSETTINGS';
export const SET_BREAKPOINT = 'SET_BREAKPOINT';
export const SET_TOPTABS = 'SET_TOPTABS';

export function setLoadingStatus(loadingStatus) {
    return {
        type: SET_LOADING_STATUS,
        loadingStatus
    }
}

export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        language
    }
}

export function setDefaultSettings(defaultSettings) {
    return {
        type: SET_DEFAULTSETTINGS,
        defaultSettings
    }
}

export function setBreakPoint(breakPoint) {
    return {
      type: SET_BREAKPOINT,
      breakPoint
    }
}

export function setTopTabs(topTabs) {
    return {
        type: SET_TOPTABS,
        topTabs
    }
}