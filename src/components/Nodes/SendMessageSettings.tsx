import { Node } from '@xyflow/react';
import React, { useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';

export default function SendMessageSettings({
  node,
  setNodes,
  setSelectedId
}: {
  node: Node;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setSelectedId : React.Dispatch<React.SetStateAction<string>>;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    const newMessage = textareaRef.current?.value || '';
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id ? { ...n,selected : false , data: { ...n.data, message: newMessage } } : n
      )
    );
    setSelectedId('')
  };

  // go back btn
  const unSelect = () => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>({ ...n,selected : false })
      )
    );
    setSelectedId('')
  }

  return (
    <div className="flex flex-col">
      <div className="border-gray-300 border-b py-2 px-4 flex">
        <button className='cursor-pointer pr-3' onClick={unSelect}>
          <FaArrowLeft size={12} />
        </button>
        <div className="grow text-center">Message</div>
      </div>

      <div className="border-b border-gray-300">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 p-4"
        >
          Text
          <textarea
            ref={textareaRef}
            id="message"
            name="message"
            rows={4}
            defaultValue={String(node?.data?.message ?? '')}
            className="mt-2 block w-full p-3 rounded-md border-gray-300 border sm:text-sm"
            placeholder="Enter your message"
          />
        </label>
      </div>

      <div className="flex px-8 py-4 gap-10 items-center">
        <button
          className="bg-white border-primary my-2 font-medium border text-primary rounded cursor-pointer py-2.5 px-4"
          onClick={handleSave}
        >
          Save
        </button>
        {/* <button className=' py-2 px-4 cursor-pointer'><MdDelete /></button> */}
      </div>
    </div>
  );
}
