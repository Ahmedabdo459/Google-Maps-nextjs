// pages/_app.js
import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import { UserLocationProvider } from "@/context/UserLocationContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserLocationProvider>
      <Component {...pageProps} />
    </UserLocationProvider>
  );
}

export default MyApp;
