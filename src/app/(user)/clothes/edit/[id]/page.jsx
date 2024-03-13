'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UploadingForm from '@/components/UploadingForm'

const EditClothesPage = () => {
  const [data, setData] = useState([]);
  const pathname = usePathname();
  const id = pathname.split("/")[3];

  useEffect(() => {
    if(id){
     fetchItemInfo(id)  
    }
  },[id])

  const fetchItemInfo = async (id) => {
    try {
      const response = await fetch(`/api/items?id=${id}`);
      if (response.ok) {
        const item = await response.json();
        setData(item);
      } else {
        console.error("Failed to fetch item info");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div><UploadingForm item={data} /></div>
  )
}

export default EditClothesPage