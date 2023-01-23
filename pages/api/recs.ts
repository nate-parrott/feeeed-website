export interface RecommendationsList {
    id: string;
    title?: string;
    description?: string;
    creator?: string;
    subscriptions: Subscription[];
}

export interface Subscription {
    id: string;
    data: SubscriptionData;

    displayTitle: string;
    displaySubtitle?: string;
    note?: string;
    color?: ColorSet;
    preview?: PreviewStory;
    asRss?: string;
    webLink?: string;
}

export interface PreviewStory {
    title?: string;
    subtitle?: string;
    url?: string;
    imageUrl?: string;
}

// Maps to `AnySubscriptionData` in Swift.
// This definition only contains fields we need to access in JS.
export interface SubscriptionData {
    feed?: { url: string; [key: string]: unknown };
    hackerNews?: { [key: string]: unknown };
    twitter?: { username: string; [key: string]: unknown };
    reddit?: { subreddit: string; [key: string]: unknown };
    youtube?: { channel: {channelId: string; [key: string]: unknown}; [key: string]: unknown };
    web?: { url: string; [key: string]: unknown };
    [key: string]: unknown;
}

export interface ColorSet {
    light: Color;
    dark?: Color;
}

export interface Color {
    r: number; // 0..1
    g: number;
    b: number;
}
