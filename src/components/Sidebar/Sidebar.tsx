import React from "react";
import { NodeItem, nodes } from "../../utils/nodes";
import "./sidebar.css";
import { Icon } from "../Icons";

export function Sidebar() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    node: NodeItem
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify(node));
  };

  const filteredGroups = nodes
    .map((group) => ({
      ...group,
      nodes: group.nodes.filter(
        (node) =>
          node.title.toLowerCase().includes(searchTerm) ||
          node.description.toLowerCase().includes(searchTerm)
      ),
    }))
    .filter((group) => group.nodes.length > 0);

  return (
    <div className="floating-sidebar">
      <input
        type="text"
        className="search-input"
        placeholder="Search nodes..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="sidebar-content">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="sidebar-group">
              <h3 className="group-title">{group.group.name}</h3>
              <div className="nodes-container">
                {group.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="node-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, node)}
                  >
                    <div className="icon">
                      {node.icon ? (
                        <Icon icon={node.icon} />
                      ) : (
                        <svg width="40" height="40" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" fill="#888" />
                        </svg>
                      )}
                    </div>
                    <div className="node-title">{node.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>
              No nodes match your search. Try a different keyword or explore all
              available nodes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
