import React, { useMemo, useState } from "react";
import { Node, Edge } from "@xyflow/react";

interface HeaderProps {
  nodes: Node[];
  edges: Edge[];
}

export default function HeaderSection({ nodes, edges }: HeaderProps) {
  const [errorVisible, setErrorVisible] = useState(false);

  const multipleTargetlessNodes = useMemo(() => {
    if (nodes.length <= 1) return false;

    // Geting all the distinc node IDs that are target of some edge
    const targetNodeIds = new Set(edges.map((e) => e.target));

    // Count how many nodes don't have a target edge
    const targetlessCount = nodes.filter((node) => !targetNodeIds.has(node.id)).length;

    return targetlessCount > 1;
  }, [nodes, edges]);

  const handleSaveClick = () => {
    if (multipleTargetlessNodes) {
      setErrorVisible(true);
    } else {
      alert('Yayyyyyyyy !!!!!!!!!')
      setErrorVisible(false);
    }
  };

  return (
    <div className="bg-gray-100 flex ">
      <div className="grow flex justify-center items-end min-h-[50px]">
        {errorVisible && (
          <div className="bg-[#fbcbcd] font-bold rounded py-2 px-4">
            Cannot Save Flow
          </div>
        )}
      </div>

      <div className="ml-auto w-[400px] flex justify-center">
        <button
          onClick={handleSaveClick}
          className="bg-white border-primary mx-auto cursor-pointer my-2 font-bold text-primary rounded border py-2 px-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
