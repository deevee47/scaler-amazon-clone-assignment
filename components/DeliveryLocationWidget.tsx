"use client";
import { useEffect, useState } from "react";

async function fetchCityFromIP(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data?.city ?? data?.region ?? null;
  } catch {
    return null;
  }
}

export default function DeliveryLocationWidget() {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      fetchCityFromIP().then(setCity);
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
          setCity(resolved ?? (await fetchCityFromIP()));
        } catch {
          setCity(await fetchCityFromIP());
        }
      },
      async () => {
        setCity(await fetchCityFromIP());
      },
      { timeout: 5000 }
    );
  }, []);

  return (
    <div className="flex items-start gap-1 text-sm cursor-pointer">
      <svg
        className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-700"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
      <span className="text-[#2261A1] hover:underline">
        {city ? `Deliver to ${city}` : "Select delivery location"}
      </span>
    </div>
  );
}
