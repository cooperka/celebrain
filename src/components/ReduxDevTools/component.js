import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';
import LogMonitor from 'redux-devtools-log-monitor';

const ReduxDevTools = createDevTools(
  <DockMonitor
    defaultPosition="bottom"
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultIsVisible
  >
    <Inspector />
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,
);

export default ReduxDevTools;
