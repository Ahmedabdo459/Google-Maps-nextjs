import React from 'react'

function SearchBar() {
  return (
    <div className='flex gap-3 bg-blue-100 p-3 rounded-2xl'>

        <svg className='text-blue-300 w-[30px]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

<input type='text' placeholder='Search For Something' className='outline-none w-full'/>

    </div>
  )
}

export default SearchBar