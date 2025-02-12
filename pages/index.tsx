import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Features from '../components/features'
import styles from '../styles/Home.module.css'
import { APP_STORE_LINK, TESTFLIGHT_LINK } from './api/links'
import { Analytics } from '@vercel/analytics/react';

const Home: NextPage = () => {
  useEffect(() => {
    const el = document.querySelector('html');
    if (el) {
      el.style.backgroundColor = '#AAC9F5';
    }
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>feeeed » scroll without the doom</title>
        <meta name="description" content="Follow anyone and any website. YouTube channels, RSS feeds, subreddits, local weather, personal step counts, birthday reminders and more." />
        <link rel="icon" href="/Icon.png" />
        <meta name="theme-color" content="#FBE5AB" />
        <meta name="apple-itunes-app" content="app-id=1600187490" />
        <Analytics />
      </Head>


      <Splash />

      <div className={styles.blackPage}>
        <div className={styles.longform}>
          <h1>Scroll on your own terms.</h1>
          <p>In {(new Date()).getFullYear()}, we work, play, sleep... and scroll. feeds and timelines dictate where our spare attention goes: what we read, watch and care about.</p>
          <p>But your “for you” page isn’t really <em>for you</em> — it’s just the content that the company knows will keep you hooked.</p>
          <p>What if you ran your own news feed? You could fill it with things you actually care about, not just clickbait. real journalism, not whatever your racist high-school classmate shares. Learn something new, remember to stay active, keep tabs on what matters.</p>
          {/* <p>feeeed is an app for that!</p> */}
        </div>
      </div>

      <div className={styles.whitePage}>
        <h1 className={styles.featuresLabel}>feeeeatures</h1>
        <Features />
      </div>

      <footer className={styles.footer}>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/terms'>Terms</Link>
          <Link href={TESTFLIGHT_LINK}>Beta</Link>
      </footer>
      <footer className={styles.footer}>
        <DownloadIcon />
      </footer>
    </div>
  )
}

const Splash = () => (
  <div className={styles.splash}>
    <div className={styles.phonePic} />
    <SplashCTA />
  </div>
)

const SplashCTA = ({hidden}: {hidden?: boolean}) => (
  <div className={styles.splashCTA} style={{opacity: hidden ? 0 : 1}} aria-hidden={hidden}>
    <h1>scroll{'\u00A0'}without the{'\u00A0'}doom</h1>
    <p>Stay informed without losing sanity. A feed curated by you, not the social-media mob.</p>
    <DownloadIcon />
  </div>
)

const DownloadIcon = () => (
  <a href={APP_STORE_LINK} className={[styles.downloadIcon].join(' ')}>
    Download feeeed
    {/* <img src='/Heart.svg' /> */}
  </a>
)

export default Home
