import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import clsx from 'clsx';
import isHotkey from 'is-hotkey';
import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react';

import { initialValue } from './data';

const HOTKEYS: Record<string, string> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const RichEditor = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), []);
  // const renderElement = useCallback(props => <Elemtn)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <div className="-ml-1 flex gap-3 px-3 pt-3">
        <MarkButton format="bold" icon={<FontBoldIcon />} />
        <MarkButton format="italic" icon={<FontItalicIcon />} />
        <MarkButton format="underline" icon={<UnderlineIcon />} />
        <MarkButton format="code" icon={<CodeIcon />} />
      </div>
      <Editable
        className="p-3"
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