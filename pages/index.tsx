import type { NextPage } from 'next'
import Head from 'next/head'
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
        
        <h1>Build your own news feed</h1>
        <h3>Follow any website</h3>
        <footer className={styles.footer}>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/terms'>Terms</Link>
        </footer>
      </Base>
    </div>
  )
}

export default Home
