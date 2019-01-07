/*
 * Publish all the pages to a destination folder.
 */
import fs from 'mz/fs';
import fsExtra from 'fs-extra';
import path from "path";
import {render} from "./render";

export async function publish(sourceDir = '', options = {}) {
    if (!options.output) {
        console.error(`Output directory is not set. Use -o or --output to set output directory.`)
        return
    }
    const {output: outputDir} = options;
    const sourceFullDirectory = path.join(process.cwd(), sourceDir);
    const pages = await fs.readdir(sourceFullDirectory);

    const pagePromises = pages.map(async pageFileName => {
        console.log(`Process ${pageFileName}.`);
        const contentMd = await fs.readFile(path.join(process.cwd(), sourceDir, pageFileName), 'utf8');
        const generatedHtml = render(contentMd);
        if (pageFileName === 'index.md') {
            await fsExtra.outputFile(path.join(process.cwd(), outputDir, 'index.html'), generatedHtml);
        } else {
            const directoryName = pageFileName.replace('.md', '');
            await fsExtra.outputFile(path.join(process.cwd(), outputDir, directoryName, 'index.html'), generatedHtml);
        }
    });

    await Promise.all(pagePromises);

    console.log('Done.')
}