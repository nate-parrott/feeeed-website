import type { NextPage } from 'next'
import Head from 'next/head'
import Base from '../components/base'
import Header from '../components/header'
import styles from '../styles/Base.module.css'

const Support: NextPage = () => {
    return (
      <div>
        <Head>
          <title>Support | feeeed app</title>
          <link rel="icon" href="/Icon.png" />
        </Head>

        <Base>
            <Header />
            <h1>Support</h1>
            <p>For support, please email <a href='mailto:nate@nateparrott.com'>nate@nateparrott.com</a> or reach out on <a href='https://twitter.com/nateparrott'>Twitter</a>.</p>
        </Base>
    </div>
    )
}

export default Support;
