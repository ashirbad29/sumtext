import BottomBar from 'components/BottomBar';
import Editor from 'components/Editor/Index';
import Nav from 'components/Nav';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import getText from 'services/getText';
import { useEditorState } from 'state';
import shallow from 'zustand/shallow';

const Home = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(false);
  const { textData, setTextData, setContent } = useEditorState(
    (state) => ({
      textData: state.textData,
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
        console.log(data);
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
    <main className="flex h-screen items-center justify-center bg-slate-200 bg-gradient-to-r from-green-200 to-green-300 py-8 backdrop-blur-lg">
      <div className="flex h-full w-11/12 flex-col rounded-md bg-white">
        {!loading && (
          <>
            <Nav />
            <Editor />
            <BottomBar />
          </>
        )}
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
