function Weather({ props }) {
  const { search, loading, weatherData, error, date, temp } = props;

  // console.log(weatherData);

  if (loading) {
    return (
      <main className=" flex justify-center items-center h-full">
        <svg
          className="h-10 w-10 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex text-center justify-center items-center h-full">
        <p className="w-52">{error}</p>
      </main>
    );
  }

  return (
    <section className="flex flex-col gap-8 items-center justify-between h-full">
      {weatherData.name && (
        <>
          <p className="text-lg">{date()}</p>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-6xl">{temp()}°C</h1>
            <h1 className="text-4xl">{weatherData?.name}</h1>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center">
              <p className="text-2xl">{weatherData?.main?.humidity}%</p>
              <h1>Humidity</h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl">{weatherData?.wind?.speed} Km/h</p>
              <h1>Wind Speed</h1>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Weather;
