'use client'

import React, { useEffect, useRef, useState } from 'react'

import { SpotifyRow } from '@/types/supabase'
import BlurredImage from '@/components/blurred-image'

function MainPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadedImages, setLoadedImages] = useState<SpotifyRow[]>(
    [] as SpotifyRow[]
  )
  const [offset, setOffset] = useState<number>(1)

  const getNextResults = async () => {
    const response = await fetch('/api/v1/spotify', {
      method: 'POST',
      body: JSON.stringify({ offset }),
    })
    const newRecords = await response.json()
    setLoadedImages((prevImages) => [...prevImages, ...newRecords])
  }

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current
      const { bottom } = container.getBoundingClientRect()
      const { innerHeight } = window
      if (bottom <= innerHeight) {
        setOffset((prevOffset) => prevOffset + 1)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    getNextResults()
  }, [offset])

  return (
    <div ref={containerRef}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loadedImages.map((image, index) => (
            <BlurredImage key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage
