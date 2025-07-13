import React from 'react'
import { BiMessageRoundedDetail } from "react-icons/bi";


export default function SendMessagePanelNode({onDragStart} : {onDragStart: React.DragEventHandler<HTMLDivElement>}) {
  return (
    <div draggable onDragStart={onDragStart} className='w-[150px] flex cursor-move gap-1 justify-center flex-col items-center p-4 border border-primary text-primary font-semibold rounded'>
        <BiMessageRoundedDetail size={24} />
        <div>Message</div>
    </div>
  )
}
