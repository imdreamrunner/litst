/*
 * The dev server
 */

import path from 'path';
import express from 'express';
import getPort from 'get-port';
import fs from 'mz/fs';
import {closingPage, errorPage, page} from "./html";
import {render} from "./render";

export async function serve(sourceDir = '', options = {}) {
    const {
        host = 'localhost',
        port = undefined
    } = options;

    const actualPort = await getPort({
        port: Array.from(Array(10).keys()).map(x => x + port || 8080)
    });

    if (port && actualPort !== port) {
        console.warn(`The specified port ${port} is not available. Automatically switched to port ${actualPort}.`)
    }

    const app = express();

    const stopServer = () => {
        console.log("Stopping the dev server.");
        process.exit(0);
    };

    const servePage = async (pageId, res) => {
        const fullPath = path.join(process.cwd(), sourceDir, pageId.toLowerCase() + '.md');
        if (! await fs.exists(fullPath)) {
            res.status(404).send(errorPage(`File ${fullPath} is not found.`))
        }
        const sourceMd = await fs.readFile(fullPath, 'utf8');
        res.send(render(sourceMd))
    };

    app.get('/exit', (req, res) => {
        res.send(closingPage());
        stopServer();
    });

    app.get('/', async (req, res) => {
        res.send(await servePage('index', res))
    });

    app.get('/:page', async (req, res) => {
        const { page } = req.params;
        res.send(await servePage(page, res))
    });

    app.listen(actualPort, host, (err) => {
        if (err) {
            console.error(`Error during starting server: ${err}`);
            return;
        }
        console.log(
            `Dev server starts at http://${host}:${actualPort}\n` +
            `To stop the server, visit http://${host}:${actualPort}/exit\n`
        );
    });

    process.on('SIGINT', stopServer);

}
