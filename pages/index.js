import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import NearbyPlaces from "@/components/NearbyPlaces";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex">
      <Navbar/>
      
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 w-full mt-20 gap-8">
        <div>

        <SearchBar/>
        <CategoryList/>
        <NearbyPlaces/>

        </div>
        <div>Google Map</div>
       
      </div>
    </div>
  );
}
