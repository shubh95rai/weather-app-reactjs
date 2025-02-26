import { useEffect } from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Weather from "./Components/Weather";

function App() {
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("city") || "london";
  });
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  function date() {
    const newDate = new Date().toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
      year: "numeric",
      weekday: "long",
    });

    return newDate;
  }

  function temp() {
    return Math.round(weatherData?.main?.temp);
  }

  function fetchData(city) {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
            import.meta.env.VITE_API_URL
          }&units=metric`
        );

        if (!response.ok) {
          throw new Error("Something went wrong! Please try again.");
        }

        const data = await response.json();

        setWeatherData(data);
        setError("");
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }, 500);
  }

  useEffect(() => {
    fetchData(search);
  }, []);

  function handleSearch() {
    if (search) {
      fetchData(search);
    }
  }

  function handleSubmit(e) {
    if (search && e.code === "Enter") {
      fetchData(search);
      localStorage.setItem("city", search);
    }
  }
  // console.log(weatherData);

  return (
    <main className="font-inter bg-gradient-to-b from-violet-900 to to-indigo-600 min-h-[100dvh] flex justify-center items-center select-none py-10 px-5 flex-col gap-8 text-neutral-100">
      <h1 className=" sm:text-5xl text-4xl font-medium bg-gradient-to-r bg-clip-text from-neutral-50 to-neutral-300 text-transparent tracking-tight">
        Weather App
      </h1>
      <div className="bg-gradient-to-b from-indigo-950 to-indigo-800 p-10 rounded-lg shadow flex flex-col gap-8 h-[450px] max-w-md w-full">
        <section className="flex items-center justify-center gap-2">
          <input
            type="text"
            className="bg-neutral-100 text-black px-5 py-2 rounded-full outline-none w-full"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyUp={handleSubmit}
            placeholder="Enter a city name"
            spellCheck="false"
          />
          <button
            type="button"
            className="p-2.5 rounded-full bg-neutral-100 text-black"
            onClick={handleSearch}
          >
            <IoSearch className="text-xl" />
          </button>
        </section>

        <Weather props={{ search, loading, weatherData, error, date, temp }} />
      </div>
    </main>
  );
}

export default App;
