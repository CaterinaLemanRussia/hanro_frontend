import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import './components/popup';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import accordion from "./components/accordion";
import oneTimePasswd from "./components/oneTimePasswd";
import "./components/to-top";

import "./components/blocks/content-under";

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();

accordion.init();
oneTimePasswd.init();
