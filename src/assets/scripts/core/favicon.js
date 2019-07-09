// JavaScript Document

// Scripts written by Jacob Bearce @ https://jacob.rocks/

import faviconModeSwitcher from "favicon-mode-switcher";

faviconModeSwitcher({
    element: document.querySelector("link[rel='shortcut icon']"),
    href: { dark: "/assets/media/favicon_dark-mode.png" },
});
