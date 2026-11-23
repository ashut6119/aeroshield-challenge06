import React from 'react';
import { Wind, Thermometer, Droplets, Compass, AlertTriangle, Info, Clock, SunMedium, Flame, RefreshCw } from 'lucide-react';
import { AirQualityData } from '../types';
import { HOTSPOT_STATIONS, StationPreset, determineAqiSeverity } from '../services/airQuality';

interface SmogDashboardProps {
  airQuality: AirQualityData;
  onSelectStation: (preset: StationPreset) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const SmogDashboard: React.FC<SmogDashboardProps> = ({
  airQuality,
  onSelectStation,
  onRefresh,
  isRefreshing
}) => {
  const currentSeverity = determineAqiSeverity(airQuality.aqi);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-sm relative overflow-hidden">
      
      {/* Background glow matching AQI color */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: currentSeverity.color }}
      />

      {/* Top Header: City Selector & Refresh */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Urban Smog Monitor & Hotspot Stations
            </span>
            <span className="text-[11px] text-slate-500">Updated {airQuality.timestamp}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            {airQuality.city}, {airQuality.country}
          </h2>
          <p className="text-xs text-slate-400">{airQuality.station}</p>
        </div>

        {/* Station Preset Pills & Refresh */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800" role="group" aria-label="Select smog hotspot city">
            {HOTSPOT_STATIONS.map((st) => {
              const isSelected = airQuality.city.includes(st.city.split(' ')[0]);
              return (
                <button
                  key={st.city}
                  onClick={() => onSelectStation(st)}
                  aria-pressed={isSelected}
                  aria-label={`Select ${st.city}, ${st.country}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {st.city.split(' ')[0]}
                </button>
              );
            })}
          </div>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/60 transition disabled:opacity-50"
            title="Refresh Live Sensor Data"
            aria-label="Refresh live sensor data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Grid: Gauge + Pollutant Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-6">
        
        {/* Left Column: Big AQI Gauge Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Air Quality Index</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${currentSeverity.bgClass}`}>
                {airQuality.severityLabel}
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-3">
              <span
                className="text-6xl sm:text-7xl font-black tracking-tight"
                style={{ color: currentSeverity.color }}
              >
                {airQuality.aqi}
              </span>
              <div className="text-xs text-slate-400 leading-tight">
                <span className="block font-semibold text-slate-300">US AQI Standard</span>
                <span>WHO Limit: &lt;50</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-medium leading-relaxed mt-2 bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
              <span className="text-rose-400 font-bold block mb-0.5">⚠️ Health Advisory:</span>
              {airQuality.advisoryHeadline}
            </p>
          </div>

          {/* Inversion Warning Pill */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${airQuality.inversionRisk === 'severe' ? 'bg-purple-500/20 text-purple-400' : 'bg-amber-500/20 text-amber-400'}`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Winter Thermal Inversion</span>
                <span className="text-[11px] text-slate-400 capitalize">{airQuality.inversionRisk} Inversion Ceiling</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Traps ground smoke
            </span>
          </div>
        </div>

        {/* Right Column: Key Environmental Sensor Readings */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          
          {/* PM2.5 */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">PM2.5 Concentration</span>
              <Flame className="w-4 h-4 text-rose-400" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{airQuality.pm25}</span>
              <span className="text-xs text-slate-400 ml-1">µg/m³</span>
            </div>
            <span className="text-[11px] font-medium text-rose-400">
              {Math.round(airQuality.pm25 / 15)}x WHO Safe Guideline
            </span>
          </div>

          {/* PM10 */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">PM10 (Coarse)</span>
              <Wind className="w-4 h-4 text-amber-400" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{airQuality.pm10}</span>
              <span className="text-xs text-slate-400 ml-1">µg/m³</span>
            </div>
            <span className="text-[11px] text-slate-400">Road dust & debris</span>
          </div>

          {/* Temperature */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Surface Temp</span>
              <Thermometer className="w-4 h-4 text-sky-400" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{airQuality.tempC}°</span>
              <span className="text-xs text-slate-400 ml-1">Celsius</span>
            </div>
            <span className="text-[11px] text-sky-300">Cold surface layer</span>
          </div>

          {/* Humidity */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Relative Humidity</span>
              <Droplets className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{airQuality.humidity}%</span>
            </div>
            <span className="text-[11px] text-cyan-300">Traps hygroscopic aerosol</span>
          </div>

          {/* Wind Speed */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Wind Dispersion</span>
              <Compass className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{airQuality.windSpeedKmh}</span>
              <span className="text-xs text-slate-400 ml-1">km/h</span>
            </div>
            <span className="text-[11px] text-amber-400">
              {airQuality.windSpeedKmh < 6 ? 'Calm / Zero dispersion' : 'Moderate dispersion'}
            </span>
          </div>

          {/* Primary Pollutant Info */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Primary Hazard</span>
              <Info className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="my-1">
              <span className="text-sm font-bold text-white line-clamp-2">Fine Combustion Particulates</span>
            </div>
            <span className="text-[11px] text-indigo-300">Deep lung penetrative</span>
          </div>

        </div>

      </div>

      {/* Diurnal Inversion Forecast Strip */}
      <div className="bg-slate-950/60 border border-slate-800/70 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              24-Hour Diurnal Inversion & AQI Forecast
            </h4>
          </div>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
            <SunMedium className="w-3.5 h-3.5" /> Best Commute / Vent Window: 1:30 PM - 3:30 PM
          </span>
        </div>

        {/* Hourly Chart Bar Visualization */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center pt-2">
          {airQuality.hourlyForecast.map((item, idx) => {
            const isTrough = item.hour === '14:00';
            const isPeak = item.hour === '08:00' || item.hour === '20:00';
            const sev = determineAqiSeverity(item.aqi);

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all ${
                  isTrough
                    ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : isPeak
                    ? 'bg-purple-950/30 border-purple-500/40'
                    : 'bg-slate-900/50 border-slate-800/60'
                }`}
              >
                <span className="text-[11px] font-mono font-medium text-slate-400">{item.hour}</span>
                <span
                  className="text-base sm:text-lg font-black my-1"
                  style={{ color: sev.color }}
                >
                  {item.aqi}
                </span>
                <div className="w-full flex items-center justify-center gap-1 text-[10px] text-slate-400">
                  <span>{item.tempC}°C</span>
                  {item.inversion && <span title="Thermal Inversion active">⚠️</span>}
                </div>
                {isTrough && (
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-1 py-0.5 rounded">
                    Safe Window
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5 leading-relaxed">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            <strong>Atmospheric Science Insight:</strong> Notice how AQI drops by nearly 40% between 1:00 PM and 3:30 PM? That is the <em>Diurnal Trough</em>, when sunlight breaks the cold thermal inversion lid. AeroShield specifically schedules necessary family transit and room air exchange into this exact window.
          </span>
        </p>
      </div>

    </div>
  );
};
