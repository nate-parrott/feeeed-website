import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Base from '../components/base'
import Header from '../components/header'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>feeeed » build your own news feed</title>
        <meta name="description" content="Follow anyone and any website" />
        <link rel="icon" href="/Icon.png" />
      </Head>

      <Base>
        <Header />
        <div className={styles.screenshots}>
          <Image src="/s1.png" width="512" height="1109" />
          <Image src="/s2.png" width="512" height="1109" />
          <Image src="/s3.png" width="512" height="1109" />
        </div>

        <h1>Build your own news feed</h1>

        <p>
        you spend hours scrolling feeds all day. shouldn't YOU be in control of what you see, rather than some algorithm?
        </p>
        
        <p>
          with feeeed, you can build your own news feed, on your own terms:
        </p>
        <ul>
        <li> subscribe to any website, using RSS, Twitter or just seeing a copy of their website in your feed</li>
        <li>see local weather, or flashbacks from your photo library</li>
        <li>subscribe to any subreddit, or read newsletters from your gmail inbox</li>
        <li>add your own custom reminders, or flashcards, or see your step count for the day</li>
        </ul>
        
        <p>
          take back your news feed ~ scroll on your own terms :)
        </p>

        <footer className={styles.footer}>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/terms'>Terms</Link>
        </footer>
      </Base>
    </div>
  )
}

export default Home
