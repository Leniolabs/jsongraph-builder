"use client";
import { EditorState, Transaction } from "prosemirror-state";
import { ProseMirror } from "@nytimes/react-prosemirror";
import { EditorView } from "prosemirror-view";

interface ProceEditorProps {
  mount: HTMLElement | null;
  setMount: (element: HTMLElement | null) => void;

  proseState: EditorState;
  onTransaction: (view: EditorView, tr: Transaction) => void;
  onKeyDown: (view: EditorView, event: KeyboardEvent) => void;
}

export function ProseEditor(props: ProceEditorProps) {
  const { mount, setMount, proseState, onTransaction, onKeyDown } = props;

  const handleClick = () => {
    mount?.focus();
  };

  return (
    <div
      className="_prosemirror-parent text-gray-100 max-h-[25dvh] max-h-52 overflow-auto default-browser"
      onClick={handleClick}
    >
      <ProseMirror
        mount={mount}
        state={proseState}
        dispatchTransaction={function (tr) {
          onTransaction(this, tr);
        }}
        handleKeyDown={onKeyDown}
      >
        <div ref={setMount} />
      </ProseMirror>
    </div>
  );
}
