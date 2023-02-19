import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/recs.module.css'
import buttonStyles from '../../styles/buttons.module.css'
import { fetchRecs, RecommendationsList, useRecs } from '../api/recs';
import { useRouter } from 'next/router';
import { download } from '../api/download';
import { generateOPML } from '../api/opml';
import { subtitlePartsForRec, titleForRec } from '../api/recHelpers';
import { SubscriptionRow } from '../../components/recs/SubscriptionRow';
import { removeUndefinedFields } from '../../utils/utils';
import { DownloadAppBar } from '../../components/recs/DownloadAppBar';
import { useState } from 'react';

const RecView = ({rec}: {rec: RecommendationsList}) => {
    const subParts = subtitlePartsForRec(rec);
    const subtitle = subParts.join(' · ');

    const [showingDownloadBar, setShowingDownloadBar] = useState(false);
    const showDownloadBar = () => setTimeout(() => setShowingDownloadBar(true), 1000);

    return (
        <>
            <Head>
                <title>{titleForRec(rec)}</title>
                <meta property="og:title" content={rec.title || "Feeds from feeeed"} />
                <meta name="description" content="A list of feeds" />
                <meta property="og:image" content="https://feeeed.nateparrott.com/RecsOG.jpg" />
            </Head>
            
            <div className={styles.root}>
                { showingDownloadBar && <DownloadAppBar dismiss={() => setShowingDownloadBar(true)} /> }
                <div className={styles.header}>
                    { rec.title && <h1>{rec.title}</h1> }
                    { subParts.length > 0 && <h2>{subtitle}</h2> }
                    <ActionButtons rec={rec} showDownloadBar={showDownloadBar} />
                </div>
                <div className={styles.grid}>
                    {rec.subscriptions.map(sub => 
                    <SubscriptionRow key={sub.id} sub={sub} recsId={rec.id} showDownloadBar={showDownloadBar} />
                    ) }
                </div>
            </div>
        </>
    )
};

const ActionButtons = ({rec, showDownloadBar}: {rec: RecommendationsList, showDownloadBar: () => void}) => {
    function downloadOPML() {
        download(generateOPML(rec), 'text/xml');
    }
    return (
        <div className={styles.actionButtons}>
            <a href={"feeeed://recommendations?id=" + rec.id} onClick={showDownloadBar} className={buttonStyles.primaryButton}>Follow on Feeeed</a>
            <a href="#" onClick={downloadOPML} className={buttonStyles.secondaryButton}>Download OPML</a>
        </div>
    )
};

interface Props {
    serverData?: RecommendationsList;
}

const Recs: NextPage = (props: Props) => {
    const router = useRouter()
    const id = router.query.id as string;
    const { serverData } = props;

    const recs = useRecs(id) ?? serverData;
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

export async function getServerSideProps(context: any) {
    const { id } = context.query;
    const recs = await fetchRecs(id);
    return {
        props: { serverData: recs ? removeUndefinedFields(recs) : null }
    };
}

export default Recs;
