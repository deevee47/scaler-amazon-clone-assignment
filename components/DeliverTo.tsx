"use client";
import { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";

const DeliverTo = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;

    setLoading(true);
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
          const city =
            addr?.city ||
            addr?.town ||
            addr?.village ||
            addr?.city_district ||
            addr?.county ||
            addr?.suburb ||
            addr?.state_district;
          setCity(city ?? null);
        } catch {
          setCity(null);
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false)
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
