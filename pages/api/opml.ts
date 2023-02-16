export interface RecommendationsList {
    id: string;
    title?: string;
    description?: string;
    creator?: string;
    subscriptions: Subscription[];
}

export interface Subscription {
    id: string;

    displayTitle: string;
    asRss?: string;
    webLink?: string;
}

export function generateOPML(recommendationsList: RecommendationsList): string {
    // Use the browser's XML DOM API to generate OPML for RSS readers
    const opml = document.implementation.createDocument(null, 'opml', null);
    const opmlRoot = opml.documentElement;
    opmlRoot.setAttribute('version', '2.0');
    const head = opml.createElement('head');
    const title = opml.createElement('title');
    title.textContent = recommendationsList.title || 'Untitled';
    head.appendChild(title);
    opmlRoot.appendChild(head);
    const body = opml.createElement('body');
    for (const subscription of recommendationsList.subscriptions) {
        const outline = opml.createElement('outline');
        outline.setAttribute('type', 'rss');
        outline.setAttribute('title', subscription.displayTitle);
        outline.setAttribute('xmlUrl', subscription.asRss || subscription.webLink || '');
        body.appendChild(outline);
    }
    opmlRoot.appendChild(body);
    return new XMLSerializer().serializeToString(opml);
}
