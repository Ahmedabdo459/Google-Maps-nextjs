import React from "react";
import Image from "next/image";
function Navbar() {
  const menu = [
    {
      id: 1,
      icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
    },

    {
      id: 2,
      icon: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    },

    {
      id: 3,
      icon: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
    },
  ];
  return (
    <div className="p-2 flex flex-col items-center w-[200px] space-y-4 shadow-lg shadow-blue-200 h-screen sticky top-0">
      <Image src={"/logo.png"} width={150} height={150} alt="logo" />

      {menu.map((item) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10 hover:text-blue-400 cursor-pointer hover:bg-blue-100 p-2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
        </svg>
      ))}
    </div>
  );
}

export default Navbar;
