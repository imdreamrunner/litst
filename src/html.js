export function page(options) {
    const {
        lang = 'en',
        title = '',
        header = '',
        script = '',
        body = ''
    } = options;
    return `<!doctype html>
    <html lang="${lang}">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        ${header}
        <script>${script}</script>
    </head>
    <body>${body}</body>
    </html>
    `
}

export function closingPage() {
    return page({
        script: `setTimeout(function() {window.close() }, 400);`,
        body: 'Bye.'
    })
}

export function errorPage(error) {
    return page({
        title: `Error: ${error}`,
        body: `<pre>${error}</pre>`
    })
}
