import React from "react";
import Image from "next/image";
import { groupedOptions } from "@/lib";

const CategoryItems = ({ data }) => {
  return (
    <div className="">
      {groupedOptions.map((group) => (
        <div key={group.label}>
          <h2 className="text-xl font-bold mb-2 ml-4">{group.label}</h2>
          <div className="flex flex-nowrap gap-5 overflow-x-auto snap-mandatory snap-x scrollbar-hide">
            {data
              .filter((item) =>
                group.options.some(
                  (opt) =>
                    opt.value === item.category.toLowerCase().replace(/\W/g, "")
                )
              )
              .map((item) => (
                <div
                  key={item._id}
                  className="border snap-center cursor-pointer rounded-lg  p-4 my-2 min-w-64 h-80 bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background transition-all duration-300 ease-in"
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
        </div>
      ))}
    </div>
  );
};

export default CategoryItems;
