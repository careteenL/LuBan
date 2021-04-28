import React, { useState } from "react"

const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
    </>
  )
}
export default Counter
