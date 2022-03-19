import { Link2Icon, ReloadIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';
import getText from 'services/getText';
import { useEditorState } from 'state';
import shallow from 'zustand/shallow';

const BottomBar = () => {
  const [copyState, setCopyState] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { setTextData, setContent, id } = useEditorState(
    (state) => ({
      setTextData: state.setText,
      setContent: state.setContent,
      id: state.textData.id,
    }),
    shallow
  );

  const handleCopyToClipboard = () => {
    if (copyState) return;
    setCopyState(true);

    setTimeout(() => {
      setCopyState(false);
    }, 2000);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(handleCopyToClipboard);
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await getText(id);
      if (data) {
        const { content, ...rest } = data;
        setTextData(rest);
        setContent(content);
      }

      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="border-t py-2 px-3">
      <div className="ml-auto flex max-w-min gap-4">
        {/* <button
          disabled={refreshing}
          className="rounded-md bg-green-500 px-2 text-white transition-all hover:ring-2 hover:ring-green-300"
          onClick={handleRefresh}>
          <ReloadIcon className={clsx({ 'animate-spin': refreshing })} />
        </button> */}
        <button
          className={clsx(
            'flex items-center rounded-md bg-green-500 px-2 py-1 text-sm text-white transition-all hover:ring-2 hover:ring-green-300'
          )}
          onClick={handleShare}>
          <span className={clsx('flex items-center gap-1', { hidden: copyState })}>
            <Link2Icon />
            Share
          </span>
          <span className={`${copyState ? 'inline-block whitespace-nowrap' : 'hidden'}`}>
            Copied <span>✨</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
