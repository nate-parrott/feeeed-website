import Image from "next/image";
import styles from '../styles/Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <a className={styles.logo2} href='/'>
                <Image src='/Icon.png' width={128} height={128} />
            </a>
            <a href='/'>
                <h2>feeeed</h2>
            </a>
            <div className={styles.spacer} />
            <a className={styles.download} href='https://testflight.apple.com/join/ixRrWfQL'>Download</a>
        </header>
    )
}

export default Header;
