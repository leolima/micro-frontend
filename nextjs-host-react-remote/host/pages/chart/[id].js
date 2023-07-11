import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import React from 'react'

export const getImage = (async (_id) => {
  const result = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&size=full&sub_id=demo-e71b13')
                  .then(r => r.json());
  return result
})

export function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
    
  }
}

export async function getStaticProps(context) {
  const { id } = context?.params;
  const result = await getImage()
  console.log({id, result})
  return {
    props: { img: result?.[0]?.url, id }
  }
}


export default function Chart(props) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Chart page</title>
        <meta name="description" content="Chart page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Chart page ({props?.id})
        </h1>

        <img src={props?.img} />

        {/* <ReactRemoteComponent /> */}
        
      </main>
    </div>
  );
}
