import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Recs.module.css'
import { RecommendationsList, Subscription } from './api/recs';
import { DEMO_REC } from './api/demoRecs';

const RecView = ({rec}: {rec: RecommendationsList}) => {
    const subParts = subtitleParts(rec);

    return (
        <>
            <Head>
                <title>{titleForRec(rec)}</title>
                <link rel="icon" href="/Icon.png" />
                <style jsx global>{`
        body {
            background-color: #F5F4F2;
        }
    `}</style>

            </Head>

            <div className={styles.root}>
                { rec.title && <h1>{rec.title}</h1> }
                { subParts.length > 0 && <p className={styles.subtitle}>{subParts.join(' · ')}</p> }
                <ActionButtons rec={rec} />
                <div className={styles.grid}>
                    {rec.subscriptions.map(sub => 
                    <SubscriptionRow key={sub.id} sub={sub} />
                    ) }
                </div>
            </div>
        </>
    )
};

function subtitleParts(rec: RecommendationsList): string[] {
    let parts: string[] = [];
    if (rec.description) {
        parts.push(rec.description);
    }
    if (rec.creator) {
        parts.push(`by ${rec.creator}`);
    }
    return parts;
}

function titleForRec(rec: RecommendationsList) {
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

const ActionButtons = ({rec}: {rec: RecommendationsList}) => {
    return (
        <div className={styles.actionButtons}>
            <a href="#" className={styles.primaryButton}>Follow on Feeeed</a>
            <a href="#" className={styles.secondaryButton}>Download OPML</a>
        </div>
    )
};

const SubscriptionRow = ({sub}: {sub: Subscription}) => {
    return (
        <div className={styles.subscriptionRow}>
            {sub.preview ? <PreviewCard preview={sub.preview} /> : <PreviewCardPlaceholder />}
            <div className={styles.subscriptionInfo}>
                {sub.displayTitle && <h3>{sub.displayTitle}</h3>}
                {sub.displaySubtitle && <p>{sub.displaySubtitle}</p>}
                {sub.webLink && <a className={styles.secondaryButton} href={sub.webLink} target='_blank'>Website</a> }
                <a href="#" className={styles.primaryButton}>Follow</a>
            </div>
        </div>
    )
};

const PreviewCard = ({preview}: {preview: PreviewStory}) => (
    // Show a clickable card with image and title
    <a className={styles.previewCard} href={preview.url}>
        {
            preview.imageUrl && <img src={preview.imageUrl} alt="" />
        }
        <h4>{preview.title ?? ""}</h4>
    </a>
);

const PreviewCardPlaceholder = () => <div className={styles.previewCardPlaceholder} />;

const Recs: NextPage = () => {
    return <RecView rec={DEMO_REC} />;
}

export default Recs;
