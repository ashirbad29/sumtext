import { getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import getText from 'services/getText';

import { getDocRef } from '../firebase';

const Home = ({ slug }: { slug: string }) => {
  const [docData, setDocData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const data = await getText(slug);
        if (data) {
          // console.log(data);
          setDocData(data);
        } else {
          router.replace('/404');
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchDoc();
  }, [slug, router]);

  return (
    <div>
      <h1>{slug}</h1>
      <code>{JSON.stringify(docData)}</code>
    </div>
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
