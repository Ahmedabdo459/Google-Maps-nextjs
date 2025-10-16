import React from "react";
import Image from "next/image";


function CategoryDetails({ category }) {
  return (
    <div className="mt-5 flex flex-col items-center bg-blue-50 rounded-2xl p-3 hover:scale-105 transition-all cursor-pointer">
      <Image src={category.icon} width={50} height={50} alt={category.name} />

      <h1 className="text-blue-500 text-[15px] mt-2">{category.name}</h1>
    </div>
  );
}

export default CategoryDetails;
