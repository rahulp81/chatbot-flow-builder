import { Handle, Position } from "@xyflow/react";

interface SendMessageNodeProps {
    selected?: boolean;
    data: {
        message?: string
    }
}

export default function SendMessageNode({selected = false,data} : SendMessageNodeProps) {
  return (
    <div className={`relative rounded-md shadow-2xl  w-xs bg-white border-primary ${selected ? 'border' : ''}`}>

      {/* Left (Target) Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'grey',
            width: '15px',
            height: '15px',
            left: '-7px',

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
          background: 'grey',
          width: '15px',
          height: '15px',
          right: '-7px'
        }}
      />

      <div className="bg-secondary font-semibold text-base p-3 rounded-md">Send Message</div>
      <div className="min-h-10 p-3 break-words">{data.message}</div>
    </div>
  );
}
