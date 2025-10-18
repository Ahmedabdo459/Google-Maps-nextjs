// pages/index.js
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import NearbyList from "@/components/NearbyList";
import { fetchNearbyPlaces } from "@/utils/overpass";

// Load Leaflet map client-side only (disable SSR)
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

export default function Home() {
  const [center, setCenter] = useState(null); // [lat, lon]
  const [type, setType] = useState("restaurant");
  const [radius, setRadius] = useState(1500);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // get user location on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        // fallback: Cairo center
        setCenter([30.0444, 31.2357]);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // search handler
  async function handleSearch() {
    if (!center) return;
    setLoading(true);
    setPlaces([]);
    setSelectedId(null);

    const [lat, lon] = center;
    const res = await fetchNearbyPlaces(lat, lon, type, radius);

    // log results for debugging
    console.log("Overpass results:", res);

    setPlaces(res);
    setLoading(false);
  }

  // select place from list
  function handleSelectPlace(place) {
    setSelectedId(place.id);
    // small timeout to ensure map exists and flyTo happens
    setTimeout(() => {
      setSelectedId(place.id);
    }, 200);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-semibold text-lg">Nearby Places (Leaflet + Overpass)</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 h-[72vh] rounded overflow-hidden shadow">
        <div className="p-4 bg-white mb-4">
  <SearchBar
    type={type}
    setType={setType}
    radius={radius}
    setRadius={setRadius}
    onSearch={handleSearch}
    searching={loading}
  />
</div>

<div className="h-[calc(85vh-72px)]">
  {center ? (
    <LeafletMap
      center={center}
      places={places}
      selectedId={selectedId}
      onMarkerClick={(p) => handleSelectPlace(p)}
    />
  ) : (
    <div className="flex items-center justify-center h-full">
      Determining location...
    </div>
  )}
</div>
        </section>

        <aside className="shadow rounded bg-white p-2 h-[72vh] overflow-auto">
          <h2 className="font-medium px-2 py-1">Results</h2>
          {loading ? <div className="p-4">Searching...</div> : <NearbyList places={places} onSelect={handleSelectPlace} />}
        </aside>
      </main>
    </div>
  );
}
