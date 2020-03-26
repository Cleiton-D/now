import { combineReducers } from 'redux';

import app from './app/reducer';
import project from './project/reducer';

export default combineReducers({ app, project });
