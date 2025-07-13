import React from 'react'
import SendMessagePanelNode from './Nodes/SendMessagePanelNode'

const nodes = [
    {
        type : 'sendMessage',
        nodeComp : SendMessagePanelNode
    }
]

export default function ActionPanel() {
    const handleDragStart = (event: React.DragEvent,type : string) => {
        event.dataTransfer.setData('application/reactflow', type);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className='w-[400px] border border-gray-300 p-6'>
            <div className='grid grid-cols-2 gap-3 gap-y-6'>
                {
                    nodes.map((node) => <node.nodeComp onDragStart={(e) => handleDragStart(e,node.type)} key={node.type}/>)
                }
            </div>
        </div>
  )
}
