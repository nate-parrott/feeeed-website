import styles from '../../styles/DownloadAppBar.module.css'
import buttonStyles from '../../styles/buttons.module.css'
import { TESTFLIGHT_LINK } from '../../pages/api/links';

interface Props {
    dismiss?: () => void;
}

export const DownloadAppBar = ({dismiss}: Props) => (
        <div className={styles.container}>
            <div className={styles.inner}>
                <img src="/Icon.png" className={styles.icon} />
                <h3>Need feeeed?</h3>
                <div className={styles.spacer}></div>
                <a href={TESTFLIGHT_LINK} target='_blank' className={buttonStyles.primaryButton}>Download</a>
            </div>
        </div>
);
