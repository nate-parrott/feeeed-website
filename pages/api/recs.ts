import { useEffect, useState } from "react";
import { DEMO_REC } from "./demoRecs";

/* 
Changes to this model must be made in three places: 
- /pages/api/recs.ts
- firebase/feeeed/src/index.ts
- RecommendationsList.swift
*/
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

interface FirebaseStringField {
    stringValue: string;
}

function parseRecs(data: any, id: string): RecommendationsList | undefined {
    if (!data || !data.fields) {
        return undefined;
    }
    const fields = data.fields;
    const recs: RecommendationsList = {
        id,
        title: fields.title?.stringValue,
        description: fields.description?.stringValue,
        creator: fields.creator?.stringValue,
        subscriptions: JSON.parse(fields.subscriptionsJson.stringValue),
    };
    return recs;
}

export function useRecs(id: string): RecommendationsList | undefined {
    const [recs, setRecs] = useState<RecommendationsList | undefined>(undefined);
    useEffect(() => {
        fetchRecs(id).then((recs) => {
            if (recs) {
                setRecs(recs);
            }
        });
    }, [id]);
    return recs;
}

export function fetchRecs(id: string): Promise<RecommendationsList | undefined> {
    if (id === 'demo') {
        return Promise.resolve(DEMO_REC);
    }
    return fetch(`https://firestore.googleapis.com/v1/projects/feeeed-aae7c/databases/(default)/documents/recommendations/${id}`)
        .then((response) => response.json())
        .then((data) => parseRecs(data, id));
}
