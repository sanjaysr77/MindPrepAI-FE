export function Signup() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black border border-white w-90 h-85 rounded-4xl text-white p-6">
        <h1 className="flex justify-center font-poppins font-bold text-xl">Welcome to MindPrep AI</h1>
        <div className="flex flex-col">
            <input className="flex font-poppins p-2 mt-5 border rounded-lg" placeholder="Enter your Email" />
            <input className="font-poppins p-2 mt-5 border rounded-lg" placeholder="Username" />
            <input type="password" className="font-poppins p-2 mt-5 border rounded-lg type" placeholder="Password" />
        </div>
        <div className="flex flex-col">
            <button className="mt-5 bg-white text-black text-md font-poppins font-bold p-2 cursor-pointer border rounded-lg
            transistion duration-200 ease-in-out
            hover:bg-gray-300 active:scale-95"> 
            
            Create an account
            </button>
        </div>
      </div>
    </div>
  );
}
