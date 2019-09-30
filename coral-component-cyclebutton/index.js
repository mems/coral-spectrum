/**
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import '../coral-theme-spectrum';

import '../coral-externals';
import '../coral-compat';

import CycleButton from './src/scripts/CycleButton';
import CycleButtonItem from './src/scripts/CycleButtonItem';
import CycleButtonAction from './src/scripts/CycleButtonAction';

import './src/styles/index.css';

import {commons} from '../coral-utils';

// Expose component on the Coral namespace
commons._define('coral-cyclebutton-action', CycleButtonAction);
commons._define('coral-cyclebutton-item', CycleButtonItem);
commons._define('coral-cyclebutton', CycleButton);

CycleButton.Item = CycleButtonItem;
CycleButton.Action = CycleButtonAction;

export {CycleButton};
