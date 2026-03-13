"use client";
import { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";

async function fetchCityFromIP(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data?.city ?? data?.region ?? null;
  } catch {
    return null;
  }
}

const DeliverTo = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      fetchCityFromIP().then((c) => { setCity(c); setLoading(false); });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "User-Agent": "amazon-clone-assignment/1.0" } }
          );
          const data = await res.json();
          const addr = data?.address;
          const resolved =
            addr?.city ||
            addr?.town ||
            addr?.village ||
            addr?.city_district ||
            addr?.county ||
            addr?.suburb ||
            addr?.state_district;
          if (resolved) {
            setCity(resolved);
            setLoading(false);
          } else {
            const ipCity = await fetchCityFromIP();
            setCity(ipCity);
            setLoading(false);
          }
        } catch {
          const ipCity = await fetchCityFromIP();
          setCity(ipCity);
          setLoading(false);
        }
      },
      async () => {
        // Permission denied — fall back to IP geolocation
        const ipCity = await fetchCityFromIP();
        setCity(ipCity);
        setLoading(false);
      },
      { timeout: 5000 }
    );
  }, []);

  return (
    <div className="headerItem hidden xl:inline-flex gap-1">
      <SlLocationPin className=" text-white mt-1" />
      <div className="text-md leading-none">
        <p className="text-gray-300 text-xs">Deliver to</p>
        <p className="text-white font-bold">
          {loading ? "Locating..." : city ?? "Your city"}
        </p>
      </div>
    </div>
  );
};

export default DeliverTo;
