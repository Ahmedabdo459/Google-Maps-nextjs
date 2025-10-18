// components/NearbyPlacesDetails.js
import React from "react";
import Image from "next/image";

const categoryImages = {
  restaurant: "/images/restaurant.jpg",
  cafe: "/images/cafe.jpg",
  pharmacy: "/images/pharmacy.jpg",
  hospital: "/images/hospital.jpg",
  school: "/images/school.jpg",
  bank: "/images/bank.jpg",
  default: "/images/placeholder.jpg",
};

function NearbyPlacesDetails({ item }) {
  const category = item?.category || item?.tags?.amenity || "default";
  const img = categoryImages[category] || categoryImages.default;

  const address =
    item?.tags?.["addr:full"] ||
    item?.tags?.["addr:street"] ||
    item?.tags?.["addr:city"] ||
    "No address info available";

  return (
    <div className="flex gap-3 border-b border-gray-200 p-3 items-center">
      <div className="w-[80px] h-[80px] rounded overflow-hidden">
        <Image src={img} alt={item?.name || "place"} width={80} height={80} className="object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item?.name || "Unnamed place"}</h3>
        <p className="text-sm text-gray-500">{address}</p>
        <p className="text-xs text-gray-400 mt-1">{category}</p>
      </div>
    </div>
  );
}

export default NearbyPlacesDetails;
