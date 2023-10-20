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
        <title>feeeed » build your own news feed, RSS reader and more</title>
        <meta name="description" content="Follow anyone and any website. YouTube channels, RSS feeds, subreddits, local weather, personal step counts, birthday reminders and more." />
        <link rel="icon" href="/Icon.png" />
        <meta name="theme-color" content="#AAC9F5" />
        <meta name="apple-itunes-app" content="app-id=1600187490" />
        <Analytics />
      </Head>


      <Splash />

      <div className={styles.blackPage}>
        <div className={styles.longform}>
          <h1>scroll on your own terms</h1>
          <p>In 2023, we work, play, sleep... and scroll. feeds and timelines dictate where our spare attention goes: what we read, watch and care about.</p>
          <p>But your “for you” page isn’t really <em>for you</em> — it’s just the content that the company knows will keep you hooked.</p>
          <p>What if you ran your own news feed? You could fill it with things you actually care about, not just clickbait. real journalism, not whatever your racist high-school classmate shares. Learn something new, remember to stay active, keep tabs on what matters.</p>
          <p>feeeed is an app for that!</p>
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
          <DownloadIcon />
      </footer>
    </div>
  )
}

const Splash = () => (
  <div className={styles.splash}>
    <SplashCTA />
    <div className={styles.phonePic} />
  </div>
)

const SplashCTA = ({hidden}: {hidden?: boolean}) => (
  <div className={styles.splashCTA} style={{opacity: hidden ? 0 : 1}} aria-hidden={hidden}>
    <h1>run your own news{'\u00A0'}feeeed</h1>
    <DownloadIcon />
  </div>
)

const DownloadIcon = () => (
  <a href={APP_STORE_LINK} className={[styles.downloadIcon, styles['buzz-on-hover']].join(' ')}>
    Download
    <img src='/Heart.svg' />
  </a>
)

export default Home
