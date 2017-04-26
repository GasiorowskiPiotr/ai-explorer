import React from 'react';
import Info from 'material-ui/svg-icons/action/info';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import PageView from 'material-ui/svg-icons/action/pageview';
import Alarm from 'material-ui/svg-icons/action/alarm';
import ImportExport from 'material-ui/svg-icons/communication/import-export';
import GroupWork from 'material-ui/svg-icons/action/group-work';
import Error from 'material-ui/svg-icons/alert/error';
import SettingsEthernet from 'material-ui/svg-icons/action/settings-ethernet';
import Extensions from 'material-ui/svg-icons/action/extension';


const TRACE = 'trace';
const CUSTOM_EVENT = 'customEvent';
const PAGE_VIEW = 'pageView';
const BROWSER_TIMING = 'browserTiming';
const REQUEST = 'request';
const DEPENDENCY = 'dependency';
const EXCEPTION = 'exception';
const AVAILABILITY_RESULT = 'availabilityResult';

const titles = {
    trace: 'TRACE',
    customEvent: 'CUSTOM EVENT',
    pageView: 'PAGE VIEW',
    browserTiming: 'BROWSER TIMING',
    request: 'REQUEST',
    depenency: 'DEPENDENCY',
    exception: 'EXCEPTION',
    availabilityResult: 'AVAILABILITY RESULT',
    systemEvent: 'SYSTEM EVENT'
};

export function formatFirstLine(log) {
    return `${log.timestamp} ${titles[log.type]}`;
};

export function formatSecondLine(log) {
    switch(log.type) {
        case TRACE: return log.trace.message;
        case CUSTOM_EVENT: return log.customEvent.name;
        case PAGE_VIEW: return `${log.pageView.name} ${log.pageView.url}`;
        case BROWSER_TIMING: return `${log.browserTiming.urlPath}: ${log.browserTiming.totalDuration} ms`;
        case REQUEST: return `${log.request.name} ${log.request.resultCode} ${log.request.duration} s`;
        case DEPENDENCY: return log.dependency.target;
        case EXCEPTION: return log.exception.outerMessage;
        case AVAILABILITY_RESULT: return log.availabilityResult.name;
        default: return "";
    }
};

export function prepareIcon(log) {
    switch(log.type) {
        case TRACE: return (<Info/>);
        case CUSTOM_EVENT: return (<CheckCircle/>);
        case PAGE_VIEW: return (<PageView/>);
        case BROWSER_TIMING: return (<Alarm/>);
        case REQUEST: return (<ImportExport/>);
        case DEPENDENCY: return (<GroupWork/>);
        case EXCEPTION: return (<Error/>);
        case AVAILABILITY_RESULT: return (<SettingsEthernet/>);
        default: return (<Extensions/>)
    } 
}