import React, { useState } from 'react'

export const useAds = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return { selectedIndex, setSelectedIndex }
}

export default useAds
