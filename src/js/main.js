import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import {bottomSheet} from "./components/bottomSheet";
import {tabs} from "./components/tabs";
import './components/popup';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import accordion from "./components/accordion";
import oneTimePasswd from "./components/oneTimePasswd";
import "./components/to-top";

import "./components/select";
import "./components/tooltip";

import "./components/search";

import "./components/copyToClipboard";

import "./components/blocks/content-under";
import "./components/blocks/slider-products";
import "./components/blocks/slider-detail";

import "./components/form";


// import bottomSheet from "./components/bottomSheet";


bottomSheet();
tabs();

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();

accordion.init();
oneTimePasswd.init();


