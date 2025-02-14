import React from "react";
import { EditorState, Transaction } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { chainCommands, newlineInCode } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { history, undo, redo } from "prosemirror-history";
import { EditorView } from "prosemirror-view";

const customKeymap = {
  "Shift-Enter": chainCommands(newlineInCode, (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr
          .replaceSelectionWith(state.schema.nodes.hard_break.create())
          .scrollIntoView()
      );
    }
    return true;
  }),
};

const defaultState = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({ "Mod-z": undo, "Mod-y": redo }),
    keymap(customKeymap),
  ],
});

export function useProseEditor(onSubmit?: (text: string) => void) {
  const [proseState, setProseState] = React.useState(defaultState);

  const text = React.useMemo(() => {
    return proseState.doc.content.textBetween(
      0,
      proseState.doc.content.size,
      "\n",
      "\n"
    );
  }, [proseState]);

  const handleTransaction = React.useCallback(
    (_: EditorView, tr: Transaction) => {
      setProseState((s) => {
        return s.apply(tr);
      });
    },
    []
  );

  const handleKeyDown = React.useCallback(
    (view: EditorView, event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        const text = view.state.doc.content.textBetween(
          0,
          view.state.doc.content.size,
          "\n",
          "\n"
        );

        if (text) {
          setProseState(
            view.state.apply(
              view.state.tr.delete(0, view.state.doc.content.size)
            )
          );

          onSubmit?.(text);
        }
      }
    },
    [onSubmit]
  );

  const clear = React.useCallback(() => {
    setProseState((state) =>
      state.apply(state.tr.delete(0, state.doc.content.size))
    );
  }, []);

  return {
    text,
    proseState,
    setProseState,
    handleTransaction,
    handleKeyDown,
    clear,
  };
}
