import { useEffect } from 'react';

const useTimeout = (effect, delay, deps = []) => {
  useEffect(() => {
    const timer = setTimeout(() => effect, delay);
    return () => {
      clearTimeout(timer); // 移除定时器
    };
  }, deps);
}

export default useTimeout;
