export function download(file: string, mimeType: string) {
    // Download this file using the browser's apis
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([file], {type: mimeType}));
    a.setAttribute('download', 'feeeed.opml');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
