import React from "react";

function NearbyPlaces() {
  return (
    <div>
      {" "}
      <h1 className="text-blue-500 font-bold mt-4 text-[20px]">
        Nearby places


        <span className='flex gap-2'>
                <svg className='cursor-pointer w-10 h-10 hover:bg-blue-100 ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

<svg className='cursor-pointer w-10 h-10 hover:bg-blue-100 ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>


            </span>
      </h1>
    </div>
  );
}

export default NearbyPlaces;
