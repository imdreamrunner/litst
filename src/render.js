/*
 * This module renders posts in markdown to html.
 */

import showdown from 'showdown';
import fs from "mz/fs";
import {page} from "./html";

const converter = new showdown.Converter();

/**
 * Renders markdown text to html
 * @param {string} md the page content markdown.
 * @returns {object} rendered page object.
 */
export async function render(md) {
    const html = converter.makeHtml(md);
    return page({
        body: html
    });
}
