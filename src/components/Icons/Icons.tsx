import { icons } from "../../utils/icons";

export function Icon(props: { icon: keyof typeof icons }) {
  const Icon = icons[props.icon];
  return <Icon />;
}
