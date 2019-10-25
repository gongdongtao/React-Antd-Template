import { combineReducers } from 'redux';
import Store from '../script/store';
import { QueryBreakPoint } from '../script/Utils';
import DefaultSettings from '../defaultSettings';
import * as ACTIONS from '../actions/home_action';
let ldf = Store.get('defaultSettings');
if (ldf) {
  ldf = JSON.parse(ldf);
} else {
  ldf = DefaultSettings;
}

function loadingStatus(state = false, action){
  switch (action.type) {
    case ACTIONS.SET_LOADING_STATUS:
      return action.loadingStatus;
    default:
      return state;
  }
}

function language(state = 'zh-CN', action) {
  switch (action.type) {
    case ACTIONS.SET_LANGUAGE:
      return action.language;
    default:
      return state;
  }
}

function defaultSettings(state = ldf, action) {
  switch (action.type) {
    case ACTIONS.SET_DEFAULTSETTINGS:
      return action.defaultSettings
    default:
        return state;
  }
}

function breakPoint(state = QueryBreakPoint() || 'lg', action){
  switch (action.type) {
    case ACTIONS.SET_BREAKPOINT:
      return action.breakPoint;
    default:
      return state;
  }
}

function topTabs(state = [], action) {
  switch (action.type) {
    case ACTIONS.SET_TOPTABS:
      return action.topTabs;
    default:
      return state;
  }
}

const homeReducer = combineReducers({
    loadingStatus,
    language,
    defaultSettings,
    breakPoint,
    topTabs
})

export default homeReducer;
