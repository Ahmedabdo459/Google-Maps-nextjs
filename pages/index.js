// pages/index.js
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import NearbyPlaces from "@/components/NearbyPlaces";
import GlobalApi from "@/auth/GlobalApi";
import { UserLocationContext } from "@/context/UserLocationContext";
import { NearbyPlacesContext } from "@/context/NearbyPlacesContext";
import { SelectedNearbyPlacesContext } from "@/context/SelectedNearbyPlacesContext";

// Load Leaflet map client-side only (no SSR)
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

// simple cache outside component
const cache = {};

export default function Home() {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const { userLocation } = useContext(UserLocationContext);
  const [selectedNearbyPlaces, setSelectedNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userLocation) getNearbyPlaces();
  }, [userLocation]);

  const getNearbyPlaces = async (category = "restaurant") => {
    if (!userLocation) return;
    const key = `${category}_${userLocation.lat}_${userLocation.lng}`;
    if (cache[key]) {
      setNearbyPlaces(cache[key]);
      return;
    }
    setLoading(true);
    try {
      const resp = await GlobalApi.getNearbyPlaces(category, userLocation.lat, userLocation.lng, 1000);
      const results = resp?.data?.results || [];
      cache[key] = results;
      setNearbyPlaces(results);
    } catch (err) {
      console.error("getNearbyPlaces error:", err);
      setNearbyPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SelectedNearbyPlacesContext.Provider value={{ selectedNearbyPlaces, setSelectedNearbyPlaces }}>
        <NearbyPlacesContext.Provider value={{ nearbyPlaces, setNearbyPlaces }}>
          <Navbar />
          <div className="grid grid-cols-1 md:grid-cols-2 px-6 w-full mt-6 gap-6">
            <div>
              <SearchBar setUserLocation={(loc) => { /* optional: let SearchBar call context setter */ }} />
              <CategoryList setSelectedCategory={(category) => getNearbyPlaces(category)} />
              {loading ? <p className="mt-4">جاري تحميل الأماكن...</p> : <NearbyPlaces />}
            </div>

            <div>
              <div className="sticky top-20">
                <LeafletMap />
              </div>
            </div>
          </div>
        </NearbyPlacesContext.Provider>
      </SelectedNearbyPlacesContext.Provider>
    </div>
  );
}
