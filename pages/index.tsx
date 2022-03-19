import { initialValue } from 'components/Editor/data';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';

import { textCollectionRef } from '../firebase';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SumText</title>
      </Head>
      <section className="container mt-3 pb-3">
        <h1>Hi Mom!</h1>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // creates a new document and redirect it to /[slug]
  const docRef = await addDoc(textCollectionRef, {
    private: false,
    content: initialValue,
    createdAt: serverTimestamp(),
  });

  return {
    redirect: {
      permanent: false,
      destination: `/${docRef.id}`,
    },
    props: {
      id: docRef.id,
    },
  };
}

export default Home;
