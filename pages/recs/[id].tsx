import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/recs.module.css'
import { PreviewStory, RecommendationsList, Subscription, useRecs } from '../api/recs';
import { useRouter } from 'next/router';
import { download } from '../api/download';
import { generateOPML } from '../api/opml';

const RecView = ({rec}: {rec: RecommendationsList}) => {
    const subParts = subtitleParts(rec);

    return (
        <>
            <Head>
                <title>{titleForRec(rec)}</title>
            </Head>
            
            <div className={styles.root}>
                <div className={styles.header}>
                    { rec.title && <h1>{rec.title}</h1> }
                    { subParts.length > 0 && <h2>{subParts.join(' · ')}</h2> }
                    <ActionButtons rec={rec} />
                </div>
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
    function downloadOPML() {
        download(generateOPML(rec), 'text/xml');
    }
    return (
        <div className={styles.actionButtons}>
            <a href={"feeeed://recommendations?id=" + rec.id} className={styles.primaryButton}>Follow on Feeeed</a>
            <a href="#" onClick={downloadOPML} className={styles.secondaryButton}>Download OPML</a>
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
                <div className={styles.subscriptionActions}>
                    {sub.webLink && <a className={styles.secondaryButton} href={sub.webLink} target='_blank'>Website</a> }
                    <a href="#" className={styles.primaryButton}>Follow</a>
                </div>
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
        <label><div>{preview.title ?? ""}</div></label>
        <label className={styles.previewCardSubtitle} aria-hidden={true}>Lorem ipsum dolor sit amet lorem ipsum</label>
    </a>
);

const PreviewCardPlaceholder = () => <div className={styles.previewCardPlaceholder} />;

const Recs: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as string

    const recs = useRecs(id);
    return (
        <>
        <Head>
                <link rel="icon" href="/Icon.png" />
                <style jsx global>{` body { background-color: #F5F4F2; } `}</style>
        </Head>

        {recs && <RecView rec={recs} />}
    </>
    );
}

export default Recs;
