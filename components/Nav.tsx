import { GearIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEditorState } from 'state';

const getStatus = (hasUnsavedChanges: boolean, syncing: boolean) => {
  if (hasUnsavedChanges && !syncing) return 'unsaved';
  if (!hasUnsavedChanges && !syncing) return 'saved';
  if (hasUnsavedChanges && syncing) return 'saving';
  return 'unsaved';
};

const Nav = () => {
  const { syncing, hasUnsavedChanges } = useEditorState((state) => ({
    syncing: state.synching,
    hasUnsavedChanges: state.hasUnsavedContent,
  }));

  return (
    <nav className="flex w-full items-center justify-between border-b px-6 py-1">
      <div className="font-medium tracking-wide">
        <span>✍️</span> <span className="text-sm text-gray-500">SumText</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="text-xs text-gray-500">
          <StatusLabel status={getStatus(hasUnsavedChanges, syncing)} />
        </div>
        <button className="group rounded-md p-1 text-gray-500 transition-all hover:bg-gray-200">
          <GearIcon className="h-5 w-5 group-hover:animate-spin" />
        </button>
      </div>
    </nav>
  );
};

const StatusLabel = ({ status }: { status: 'saving' | 'saved' | 'unsaved' }) => {
  const getMessage = () => {
    if (status === 'saving') return 'Saving Changes';
    if (status === 'saved') return 'Changes Saved';
    if (status === 'unsaved') return 'Unsaved Changes';
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-3 rounded-lg border px-2 py-1',
        {
          'border-green-300': status === 'saved',
          'border-orange-300': status === 'saving',
          'border-red-300': status === 'unsaved',
        }
      )}>
      <span className="relative flex h-3 w-3">
        {status === 'saving' && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
        )}
        <span
          className={clsx(' inline-flex h-3 w-3 rounded-full', {
            'bg-green-500': status === 'saved',
            'bg-orange-500': status === 'saving',
            'bg-red-500': status === 'unsaved',
          })}></span>
      </span>
      <span>{getMessage()}</span>
    </div>
  );
};

export default Nav;
