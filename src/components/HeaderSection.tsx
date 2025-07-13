export default function Header() {
  return (
    <div className="bg-gray-100  flex">
      {/* Error Message / Validation Continer */}
      <div className="grow flex justify-center items-end">
        <button className="bg-[#fbcbcd] font-bold rounded py-2 px-4">
          Cannot Save Flow
        </button>
      </div>

      <div className="ml-auto w-[400px] flex justify-center">
        <button className="bg-white border-primary mx-auto my-2 font-bold text-primary rounded border py-2 px-4">
          Save Changes
        </button>
      </div>
    </div>
  )
}
