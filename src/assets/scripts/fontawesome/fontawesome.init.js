// JavaScript Document

// Scripts written by Jacob Bearce @ https://jacob.rocks/

import { library, dom } from "@fortawesome/fontawesome-svg-core";

import { faCodepen as fabCodepen } from "@fortawesome/free-brands-svg-icons/faCodepen";
import { faDev as fabDev } from "@fortawesome/free-brands-svg-icons/faDev";
import { faGithub as fabGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faGitlab as fabGitlab } from "@fortawesome/free-brands-svg-icons/faGitlab";
import { faStackOverflow as fabStackOverflow } from "@fortawesome/free-brands-svg-icons/faStackOverflow";

import { faClock as fasFaClock } from "@fortawesome/pro-solid-svg-icons/faClock";
import { faComment as fasFaComment } from "@fortawesome/pro-solid-svg-icons/faComment";
import { faHeart as fasFaHeart } from "@fortawesome/pro-solid-svg-icons/faHeart";

/**
 * Add brand icons
 */
library.add(fabCodepen, fabDev, fabGithub, fabGitlab, fabStackOverflow);

/**
 * Add solid icons
 */
library.add(fasFaClock, fasFaComment, fasFaHeart);

/**
 * Watch the DOM to insert icons
 */
dom.watch();
