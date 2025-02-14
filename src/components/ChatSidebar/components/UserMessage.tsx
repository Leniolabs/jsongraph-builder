export interface UserMessageComponentProps {
  content: string;
}

export function UserMessage(props: UserMessageComponentProps) {
  return <div className="user-message">{props.content}</div>;
}
