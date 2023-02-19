import styles from '../../styles/SubscriptionRow.module.css'
import buttonStyles from '../../styles/buttons.module.css'
import { PreviewStory, Subscription } from "../../pages/api/recs";

interface Props {
    showDownloadBar: () => void;
    sub: Subscription;
    recsId: string;
}
export const SubscriptionRow = ({sub, recsId, showDownloadBar}: Props) => {
    const subFollowLink = `feeeed://recommendations?id=${recsId}&focus=${sub.id}`;
    return (
        <div className={styles.subscriptionRow}>
            {sub.preview ? <PreviewCard preview={sub.preview} /> : <PreviewCardPlaceholder />}
            <div className={styles.subscriptionInfo}>
                {sub.displayTitle && <h3>{sub.displayTitle}</h3>}
                {sub.displaySubtitle && <p>{sub.displaySubtitle}</p>}
                <div className={styles.subscriptionActions}>
                    {sub.webLink && <a className={buttonStyles.secondaryButton} href={sub.webLink} target='_blank'>Website</a> }
                    <a href={subFollowLink} onClick={showDownloadBar} className={buttonStyles.primaryButton}>Follow</a>
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
