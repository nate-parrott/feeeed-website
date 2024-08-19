import Parser from 'rss-parser';

export interface FeedItem {
    timestamp: number // gmt, in seconds
    title: string;
    url: string;
    pubName: string;
}

export async function fetchFeed(url: string): Promise<FeedItem[]> {
    const startTime = Date.now();
    console.log(`Fetching feed: ${url}`);

    // Use fetch api to get the feed; timeout 10_000
    const response = await fetch(url, {signal: AbortSignal.timeout(10_000)});
    const text = await response.text();
    console.log(`Fetched feed ${url} in ${Date.now() - startTime}ms; ${text.length} bytes`);
    // console.log(text.substring(0, 1000));

    const parseStartTime = Date.now();
    const parser = new Parser({
        // xml2js: {strict: false},
    }); // {timeout: 10_000});
    const maxBytes = 100_000;
    const truncatedText = text // .substring(0, Math.min(maxBytes, text.length))
    const feed = await parser.parseString(truncatedText);
    console.log(`Parsed feed ${url} in ${Date.now() - parseStartTime}ms; ${feed.items.length} items; processed ${truncatedText.length} / ${text.length} bytes`);

    // Extract items
    return feed.items.map((item) => {
        const hasFields = item.isoDate && item.title && item.link;
        if (!hasFields) {
            throw new Error(`Invalid feed item: ${JSON.stringify(item)}`);
        }
        return {
            timestamp: new Date(item.isoDate as string).getTime() / 1000,
            title: item.title as string,
            url: item.link as string,
            pubName: feed.title ?? url,
        };
    });
}
