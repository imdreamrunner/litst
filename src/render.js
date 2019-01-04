/*
 * This module renders posts in markdown to html.
 */

import showdown from 'showDown';

const converter = new showdown.Converter();

/**
 * Renders markdown text to html
 * @param {string} md the markdown text.
 * @returns {object} rendered page object.
 */
export function render(md) {
    const html = converter.makeHtml(md);
    return {
        body: html
    };
}
