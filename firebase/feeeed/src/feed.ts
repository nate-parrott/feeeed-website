import Parser from 'rss-parser';

export interface FeedItem {
    timestamp: number // gmt, in seconds
    title: string;
    url: string;
    pubName: string;
}

export async function fetchFeed(url: string): Promise<FeedItem[]> {
    const parser = new Parser({timeout: 5000});
    const feed = await parser.parseURL(url);
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
