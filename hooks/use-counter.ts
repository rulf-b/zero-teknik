import { useState, useEffect } from 'react';

interface UseCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
}

export const useCounter = ({ end, start = 0, duration = 2000, delay = 0 }: UseCounterProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const difference = end - start;
      
      const updateCounter = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Daha dengeli easing function - easeOutCubic
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(start + difference * easeOutCubic);
        
        setCount(currentCount);
        
        if (progress < 1) {
          // Daha az sıklıkta güncelleme yaparak performansı artır
          setTimeout(updateCounter, 16); // ~60fps yerine daha az
        }
      };
      
      updateCounter();
    }, delay);

    return () => clearTimeout(timer);
  }, [end, start, duration, delay]);

  return count;
}; 