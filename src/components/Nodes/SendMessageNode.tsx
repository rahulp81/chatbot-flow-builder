import { Handle, Position } from "@xyflow/react";

export default function SendMessageNode() {
  return (
    <div className="relative rounded-md shadow-2xl  w-xs bg-white ">

      {/* Left (Target) Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'black',
            width: '10px',
            height: '10px',
            left: '-4px'
        }}
      />

      {/* Right (Source) Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'black',
          width: '10px',
          height: '10px',
          right: '-4px'
        }}
      />

      <div className="bg-secondary font-semibold text-base p-3 rounded-md">Send Message</div>
      <div className="min-h-10 p-3 break-words">Yooo</div>
    </div>
  );
}
