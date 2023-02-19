import FileSaver from "file-saver";

// Downloads the content as a file
export function download(file: string, mimeType: string) {

    const blob = new Blob([file], { type: mimeType });
    
    // const link = document.createElement('a');
    // link.style.display = 'none';
    // link.href = URL.createObjectURL(blob);
    // link.download = 'feeeed.opml';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, 'feeeed.opml');
}

