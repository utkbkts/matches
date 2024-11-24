import React from "react";

type CircularProgressBarProps = {
  progress: number; // Doluluk oranı (0 ile 100 arasında bir değer)
  size?: number; // Çemberin boyutu
  strokeWidth?: number; // Çemberin kalınlığı
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="relative">
      {/* Gradyan tanımı */}
      <defs>
        <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "rgba(2, 200, 36, 1)" }} />
          <stop offset="44%" style={{ stopColor: "rgba(80, 250, 40, 40)" }} />
          <stop offset="69%" style={{ stopColor: "rgba(31, 400, 200, 1)" }} />
        </linearGradient>
      </defs>

      {/* Arka plan çemberi */}
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* İlerleme çemberi (gradyanlı) */}
      <circle
        stroke="url(#circularGradient)"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        className="transition-all duration-300"
      />

      {/* Progres değerini göstermek için metin */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20px"
        fill="#333"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
