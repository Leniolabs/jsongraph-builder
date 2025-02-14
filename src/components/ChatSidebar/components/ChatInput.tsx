import React from "react";
import { ProseEditor } from "./ProseEditor";
import { useProseEditor } from "./useProseEditor";
import { ArrowUp } from "lucide-react";

export interface ChatInputComponentProps {
  onSend: (message: string) => void;
  streaming?: boolean;
}

export function ChatInput(props: ChatInputComponentProps) {
  const { onSend, streaming } = props;

  const [mount, setMount] = React.useState<HTMLElement | null>(null);

  const handleSubmit = React.useCallback(
    (text: string) => {
      if (!streaming) {
        onSend?.(text);
      }
    },
    [onSend, streaming]
  );

  const handleClick = () => {
    mount?.focus();
  };

  const { proseState, text, handleKeyDown, handleTransaction, clear } =
    useProseEditor(handleSubmit);

  const handleSubmitClick = React.useCallback(() => {
    if (text) {
      handleSubmit?.(text);
      clear();
    }
  }, [text, clear, handleSubmit]);

  return (
    <div id="composer-background" onClick={handleClick}>
      <div>
        <div>
          <ProseEditor
            mount={mount}
            setMount={setMount}
            proseState={proseState}
            onTransaction={handleTransaction}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSubmitClick}>
            <ArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
