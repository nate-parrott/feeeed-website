import { RecommendationsList } from "./recs";

export function subtitlePartsForRec(rec: RecommendationsList): string[] {
    let parts: string[] = [];
    if (rec.description) {
        parts.push(rec.description);
    }
    if (rec.creator) {
        parts.push(`by ${rec.creator}`);
    }
    if (parts.length === 0 && rec.subscriptions.length) {
        if (rec.subscriptions.length === 1) {
            parts.push(`One feed`);
        } else {
            parts.push(`A list of ${rec.subscriptions.length} feeds`);
        }
    }
    return parts;
}

export function titleForRec(rec: RecommendationsList) {
    let parts: string[] = [];
    if (rec.title) {
        parts.push(rec.title);
    }
    if (rec.creator) {
        parts.push(`a list of feeds by ${rec.creator}`);
    }
    parts.push('feeeed app');
    return parts.join(' | ');
}