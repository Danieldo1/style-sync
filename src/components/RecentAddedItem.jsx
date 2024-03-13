import React from "react";
import Image from "next/image";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const RecentAddedItem = ({ data, loading }) => {
  return (
    <div className="w-full h-full justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10  mt-5 ">
      {loading
        ? Array(4)
            .fill()
            .map((_, index) => <LoadingSkeleton key={index} />)
        : data.map((item) => (
            <div
              key={item._id}
              className="border cursor-pointer rounded-lg p-4 m-2 w-64 h-80 bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background transition-all duration-300 ease-in"
            >
              <div className="w-full h-56 relative">
                <Image
                  src={item.photoUrl}
                  alt={item.category}
                  fill
                  className=" object-cover mb-2"
                />
              </div>
              <div className="text-xl capitalize">{item.category}</div>
              <div className="text-base capitalize text-ring">
                {item.colors.join(", ")}
              </div>
            </div>
          ))}
    </div>
  );
};

export default RecentAddedItem;
