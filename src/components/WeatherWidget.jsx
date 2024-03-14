const WeatherWidget = ({ weather }) => {
  const { location, current } = weather;

  return (
    <div className="p-5 bg-primary-foreground max-w-3xl mx-auto rounded-e-xl border border-muted-foreground shadow-md shadow-muted-foreground">
      <h2 className="text-xl font-bold text-center mb-2">
        Current Weather in {location?.name}, {location?.region}
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p>
            <span className="text-lg font-bold">Wind:</span> {current?.wind_kph}{" "}
            kph
          </p>
          <p>
            <span className="text-lg font-bold">Humidity:</span>{" "}
            {current?.humidity}%
          </p>
        </div>
        <div className="flex items-center">
          <div>
            <img
              src={`https:${current?.condition.icon}`}
              alt={current?.condition.text}
              className="w-12 h-12 mr-4"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {current?.temp_c}°C / {current?.temp_f}°F
            </h3>

            <p className="text-muted-foreground">{current?.condition.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
