import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';
import LogMonitor from 'redux-devtools-log-monitor';

const IS_DEV = process.env.NODE_ENV === 'development';

const ReduxDevTools = IS_DEV ? createDevTools(
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
) : () => null;

export default ReduxDevTools;
