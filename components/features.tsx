import styles from '../styles/Features.module.css'
// import Image from 'next/image'

interface ImageProps {
    src: string; alt: string; width: number; height: number;
}
const Image = ({src, alt, width, height}: ImageProps) => <img src={src} alt={alt} width={width} height={height} />;

const Features = () => {
    return (
        <div className={styles.featureGrid}>

            <div className={[styles.card, styles.red].join(' ')}>
                <h1>Follow almost any website</h1>
                <p>Subscribe via RSS, Youtube, Reddit or email</p>
                <Image alt='' src='/Cards/FollowAnySite.png' width={400} height={369} />
            </div>

            <div className={[styles.card, styles.purple].join(' ')}>
                <h1><s>Read newsletters from your Gmail inbox</s></h1>
                <p>Gmail disabled their API for this, so gone for now!</p>
                {/* <p>Link your Gmail and read newsletters from your inbox. The data never leaves your phone.</p> */}
                <Image alt='' src='/Cards/Newsletter.png' width={400} height={402} />
            </div>

            <div className={[styles.card, styles.dark].join(' ')}>
                <h1>Super-fast reader mode</h1>
                <Image alt='' src='/Cards/Reader.png' width={400} height={469} />
            </div>

            {/* <div className={[styles.card, styles.twitterBlue].join(' ')}>
                <Image alt='' src='/Cards/Twitter.png' width={400} height={319} />
                <h1 style={{marginTop: '0.5em'}}>Links from people you follow on Twitter, sorted by number of shares</h1>
            </div> */}

            <div className={[styles.card, styles.dark].join(' ')}>
                <h1>Customizable Widgets</h1>
                <Image alt='' src='/Cards/Widgets.png' width={400} height={360} />
            </div>

            <div className={[styles.card, styles.green].join(' ')}>
                <Image alt='' src='/Cards/Web.png' width={400} height={488} />
                <h1 style={{marginTop: '0.3em'}}>Turn any website into a live card</h1>
            </div>

            <div className={[styles.card, styles.dark, styles.red].join(' ')}>
                <h1>No accounts or servers. Private by design.</h1>
            </div>

            <div className={[styles.card, styles.blue].join(' ')}>
                <Image alt='' src='/Cards/Weather.png' width={400} height={227} />
                <h1 style={{marginTop: '0.3em'}}>Keep tabs on the weather</h1>
            </div>

            <div className={[styles.card, styles.dark].join(' ')}>
                <h1 style={{marginBottom: '0.3em'}}>A reading list that reminds you to read</h1>
                <Image alt='' src='/Cards/ReadingList.png' width={400} height={371} />
            </div>

            <div className={[styles.card, styles.healthRed].join(' ')}>
                <Image alt='' src='/Cards/Health.png' width={400} height={388} />
                <h1 style={{marginTop: '0.3em'}}>Get reminders to reach 10k steps each day</h1>
            </div>

            <div className={[styles.card, styles.blue].join(' ')}>
                <h1>Fully chronological feed, if you want</h1>
                <Image alt='' src='/Cards/Chron.png' width={400} height={237} />
            </div>

            
            <div className={[styles.card, styles.dark].join(' ')}>
                <h1 style={{marginBottom: '0.3em'}}>Flashbacks from your photo library</h1>
                <Image alt='' src='/Cards/Photos.png' width={400} height={348} />
            </div>

            <div className={[styles.card, styles.green].join(' ')}>
                <Image alt='' src='/Cards/Flashcards.png' width={400} height={226} />
                <h1 style={{marginTop: '0.3em'}}>Import flashcards and learn something while you scroll.</h1>
            </div>

            <div className={[styles.card, styles.dark].join(' ')}>
                <h1>Follow any subreddit</h1>
                <Image alt='' src='/Cards/Reddit.png' width={400} height={445} />
            </div>

            <div className={[styles.card, styles.purple].join(' ')}>
                <h1>Set up custom reminders that appear in your feed</h1>
                <Image alt='' src='/Cards/Reminder.png' width={400} height={267} />
            </div>

        </div>
    )
};

export default Features;
