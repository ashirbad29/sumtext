import { GearIcon } from '@radix-ui/react-icons';
import Editor from 'components/Editor/Index';
import Nav from 'components/Nav';
import { getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import getText from 'services/getText';

import { getDocRef } from '../firebase';
const Home = ({ slug }: { slug: string }) => {
  const [docData, setDocData] = useState<any>({});
  const router = useRouter();

  // useEffect(() => {
  //   const fetchDoc = async () => {
  //     try {
  //       const data = await getText(slug);
  //       if (data) {
  //         // console.log(data);
  //         setDocData(data);
  //       } else {
  //         router.replace('/404');
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchDoc();
  // }, [slug, router]);

  return (
    <main className="flex h-screen items-center justify-center bg-slate-200 bg-gradient-to-r from-green-200 to-green-300 py-8 backdrop-blur-lg">
      <div className="h-full w-11/12 rounded-md bg-white">
        <Nav />
        <Editor />
      </div>
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query?.slug;

  if (!slug) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  return {
    props: {
      slug,
    },
  };
}

export default Home;
