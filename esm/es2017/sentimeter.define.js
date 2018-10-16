
// sentimeter: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './sentimeter.core.js';
import {
  SentimeterComponent
} from './sentimeter.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    SentimeterComponent
  ], opts);
}
