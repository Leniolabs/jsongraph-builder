import { DynamicIcon } from "lucide-react/dynamic";
import ReactMarkdown from "react-markdown";

export interface AssistantMessageComponentProps {
  content: string;
  loading?: boolean;
}

export function AssistantMessage(props: AssistantMessageComponentProps) {
  return (
    <div className={"assistant-message" + (props.loading ? " loading" : "")}>
      <div className="assistant-icon">
        <DynamicIcon name="git-fork" />
      </div>
      <div className="assistant-text">
        <ReactMarkdown className="markdown">{props.content}</ReactMarkdown>
      </div>
    </div>
  );
}
