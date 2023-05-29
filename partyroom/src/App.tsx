import { useState } from "react";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 h-screen text-white flex flex-col place-content-center place-items-center">
        <div className="h-36 w-52 dark:bg-slate-500 flex place-content-center place-items-center mb-12 rounded-lg">
          Logo
        </div>
        <button className="dark: bg-slate-500 py-2 px-4 mb-6 rounded-2xl text-white">
          New User
        </button>
        <button
          className="dark: bg-slate-500 py-2 px-4 mb-6 rounded-2xl text-white"
          onClick={() => setCount(count + 1)}
        >
          Existing User
        </button>
        {/* <div>count: {count}</div> */}
      </div>
    </>
  );
}

export default App;
