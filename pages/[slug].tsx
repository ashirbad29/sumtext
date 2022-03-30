import BottomBar from 'components/BottomBar';
import Editor from 'components/Editor/Index';
import Nav from 'components/Nav';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import getText from 'services/getText';
import { useEditorState } from 'state';
import shallow from 'zustand/shallow';

const Home = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(false);
  const { setTextData, setContent } = useEditorState(
    (state) => ({
      setTextData: state.setText,
      setContent: state.setContent,
    }),
    shallow
  );
  const router = useRouter();

  const fetchDoc = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getText(slug);
      if (data) {
        const { content, ...rest } = data;
        setTextData(rest);
        setContent(content);
        setLoading(false);
      } else {
        router.replace('/404');
      }
    } catch (e) {
      console.log(e);
    }
  }, [router, slug, setContent, setTextData]);

  useEffect(() => {
    fetchDoc();
  }, [fetchDoc]);

  return (
    <>
      <Head key="head">
        <title>SumText</title>
      </Head>
      <main className="flex h-screen min-h-[400px] items-center justify-center bg-slate-200 bg-gradient-to-r from-green-200 to-green-300 py-0 backdrop-blur-lg sm:py-8">
        <div className="flex h-full w-full flex-col rounded-md bg-white sm:w-11/12">
          {loading && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="inline-flex h-4 w-4 rounded-full"></span>
              </span>
              <span className="font-medium text-orange-400">Loading</span>
            </div>
          )}
          {!loading && (
            <>
              <Nav />
              <Editor />
              {/* <BottomBar /> */}
            </>
          )}
        </div>
      </main>
    </>
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
