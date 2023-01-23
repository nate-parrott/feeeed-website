import type { NextPage } from 'next'
import Head from 'next/head'
import Base from '../components/base'
import styles from '../styles/Recs.module.css'

const Privacy: NextPage = () => {
    return (
      <div>
        <Head>
          <title>Recs test | feeeed app</title>
          <link rel="icon" href="/Icon.png" />
        </Head>

        <div className={styles.root}>
            <h1>hello world</h1>
        </div>
    </div>
    )
}

export default Privacy;
