/*
 * Publish all the pages to a destination folder.
 */
import fs from 'mz/fs';
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

    const outputFullPath = path.join(process.cwd(), outputDir);
    if (! await fs.exists(outputFullPath)) {
        console.log(`Output directory "${outputFullPath}" does not exist. Create it.`)
        await fs.mkdir(outputFullPath);
    }

    const pagePromises = pages.map(async pageFileName => {
        const contentMd = await fs.readFile(path.join(process.cwd(), sourceDir, pageFileName), 'utf8');
        const generatedHtml = render(contentMd);
        const generatedFileName = pageFileName.replace('.md', '.html');
        await fs.writeFile(path.join(process.cwd(), outputDir, generatedFileName), generatedHtml);
    });

    await Promise.all(pagePromises);

    console.log('Done.')
}