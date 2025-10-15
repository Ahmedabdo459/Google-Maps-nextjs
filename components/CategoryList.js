import React, { useEffect } from 'react'
import { useState } from 'react'
import categoryListData from '@/data/CategoryData'
import CategoryDetails from './CategoryDetails'
function CategoryList() {

    const [category,setCategory] = useState([])
    useEffect(()=>{
            setCategory(categoryListData)
    },[])
  return (
    <div>
        <h1 className='text-blue-500 font-bold mt-4 text-[20px]'>Select Category</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 items-center gap-6'>
        {category?.map((item)=>(
          <CategoryDetails category = {item} />
        ))}
        </div>
    </div>
  )
}

export default CategoryList