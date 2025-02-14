import { Handle, NodeProps, Position } from "@xyflow/react";
import { icons } from "../../../utils/icons";
import { Icon } from "../../Icons";

export function OutputNode(
  props: NodeProps & { data: { icon: keyof typeof icons; label: string } }
) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        {props.data.icon && <Icon icon={props.data.icon} />}
        <label htmlFor="text">{props.data?.label}</label>
      </div>
    </>
  );
}
