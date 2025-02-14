import { Handle, NodeProps, Position } from "@xyflow/react";
import { DynamicIcon } from "lucide-react/dynamic";
import { icons } from "../../../utils/icons";

export function TriggerNode(
  props: NodeProps & { data: { icon: keyof typeof icons; label: string } }
) {
  return (
    <>
      <Handle type="source" position={Position.Bottom} />
      <div className="node-content">
        {props.data.icon && <DynamicIcon name={props.data.icon} />}
        <label htmlFor="text">{props.data?.label}</label>
      </div>
    </>
  );
}
