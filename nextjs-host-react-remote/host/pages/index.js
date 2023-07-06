import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactRemoteComponent = dynamic(() => import('remote/Nav'), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const result = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&size=full&sub_id=demo-e71b13')
                  .then(r => r.json())

  return {
    props: { img: result?.[0]?.url }
  }
}

export default function Home(props) {
  const [count, setCount] = useState(0)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <img src={props?.img} />
        <button onClick={() => setCount(count+1)}>count: {count}</button>
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <ReactRemoteComponent />
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card} data-e2e="TEXTED_LINK_CARD">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card} data-e2e="TEXTED_LINK_CARD">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card} data-e2e="TEXTED_LINK_CARD">
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            data-e2e="TEXTED_LINK_CARD"
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
