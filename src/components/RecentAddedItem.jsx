
import React from 'react'
import Image from "next/image";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const RecentAddedItem = ({ data, loading }) => {
  return (
    <div className="w-full justify-between flex mt-5 flex-wrap">
      {loading
        ? Array(4)
            .fill()
            .map((_, index) => <LoadingSkeleton key={index} />)
        : data.map((item) => (
            <div key={item._id} className="border rounded-lg p-4 m-2 w-64 h-80">
              <img
                src={item.photoUrl}
                alt={item.category}
                className="w-full h-56 object-cover mb-2"
              />
              <div className="text-gray-800">{item.category}</div>
              <div className="text-gray-600">{item.colors.join(", ")}</div>
            </div>
          ))}
    </div>
  );
}

export default RecentAddedItem