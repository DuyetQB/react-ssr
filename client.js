/* global document, window */

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Routes from './src/components/Routes.jsx';

const container = document.getElementById('app');
hydrateRoot(container, <Routes/>);
