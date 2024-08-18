import {useEffect, useState} from "react";

export function useDebounce(value: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
}
