import { useMemo, useState } from "react";

export function useUpdate() {
  const [count, setCount] = useState<number>(0)
  return useMemo(() => {
    return {
      forceUpdate: () => setCount(count + 1)
    }
  }, [count])
}
