import FileSaver from "file-saver";

export function download(file: string, mimeType: string) {
    const blob = new Blob([file], { type: mimeType });
    FileSaver.saveAs(blob, 'feeeed.opml');
}

