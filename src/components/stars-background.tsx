'use client';
import { useEffect, useState } from 'react';

const Star = ({ style }: { style: React.CSSProperties }) => {
  return <div className="star" style={style}></div>;
};

const StarsBackground = ({ count = 200 }) => {
  const [stars, setStars] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: count }).map((_, i) => {
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${Math.random() * 50 + 100}s`,
        };
        return <Star key={i} style={style} />;
      });
      setStars(newStars);
    };
    generateStars();
  }, [count]);

  return <>{stars}</>;
};

export default StarsBackground;
