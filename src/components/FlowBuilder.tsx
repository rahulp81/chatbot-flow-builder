import HeaderSection from "@/components/HeaderSection";
import { ReactFlowProvider } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import ActionPanel from "@/components/ActionPanel";
import SendMessageNode from "./Nodes/SendMessageNode";
import FlowContent from "./FlowContent";

const nodeTypes = {
  sendMessage: SendMessageNode,
};

export default function FlowBuilder() {
  return (
    <div className="h-screen flex flex-col">
      <HeaderSection />
      <div className="flex grow">
        <ReactFlowProvider>
          <div className="grow">
            <FlowContent nodeTypes={nodeTypes} />
          </div>
          <ActionPanel />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
