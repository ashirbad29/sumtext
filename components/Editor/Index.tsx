import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import clsx from 'clsx';
import isHotkey from 'is-hotkey';
import { useCallback, useEffect, useMemo, useState } from 'react';
import saveText from 'services/saveText';
import { createEditor, Descendant, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react';
import { useEditorState } from 'state';
import shallow from 'zustand/shallow';

const HOTKEYS: Record<string, string> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const RichEditor = () => {
  const { content, setContent, textData } = useEditorState(
    (state) => ({
      content: state.content,
      setContent: state.setContent,
      textData: state.textData,
    }),
    shallow
  );

  // const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), []);
  // const renderElement = useCallback(props => <Elemtn)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const debounce = (func: (id: string, data: any) => Promise<void>, delay: number) => {
    let timer: any = null;

    return (...args: any) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        console.log('debounce called');
        func.apply(this, args);
      }, delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(debounce(saveText, 3000), []);

  return (
    <Slate
      editor={editor}
      value={content}
      onChange={(value) => {
        setContent(value);
        debouncedFetch(textData.id, { ...textData, content: value });
      }}>
      <div className="-ml-1 flex gap-3 px-3 pt-1">
        <MarkButton format="bold" icon={<FontBoldIcon />} />
        <MarkButton format="italic" icon={<FontItalicIcon />} />
        <MarkButton format="underline" icon={<UnderlineIcon />} />
        <MarkButton format="code" icon={<CodeIcon />} />
      </div>
      <Editable
        className="flex-1 overflow-y-auto p-3"
        renderLeaf={renderLeaf}
        autoFocus
        spellCheck
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}></Editable>
    </Slate>
  );
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor);
  // @ts-ignore
  return marks ? marks[format] === true : false;
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: any;
  leaf: any;
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const MarkButton = ({ format, icon }: { format: string; icon: any }) => {
  const editor = useSlate();

  return (
    <button
      className={clsx('rounded p-1 transition-all hover:bg-gray-200', {
        'bg-gray-200': isMarkActive(editor, format),
      })}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}>
      {icon}
    </button>
  );
};

export default RichEditor;
