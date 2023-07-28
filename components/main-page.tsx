'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { SpotifyRow } from '@/types/supabase'
import BlurredImage from '@/components/blurred-image'
import DebouncedInput from '@/components/debounced-input'
import { SkeletonCard } from '@/components/skeleton-card'

function MainPage() {
  const [loadedImages, setLoadedImages] = useState<SpotifyRow[]>(
    [] as SpotifyRow[]
  )
  const [offset, setOffset] = useState<number>(0)
  const [searchParam, setSearchParam] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  const getNextResults = async () => {
    const response = await fetch('/api/v1/spotify', {
      method: 'POST',
      body: JSON.stringify({ offset, searchParam }),
    })
    if (response.status === 200) {
      const newRecords = await response.json()
      if (searchParam === '') {
        setLoadedImages((prevImages) => [...prevImages, ...newRecords])
      } else {
        setLoadedImages(newRecords)
      }
    } else {
      console.error(response)
    }
  }

  const handleScroll = useCallback(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current
      const { bottom } = container.getBoundingClientRect()
      const { innerHeight } = window
      if (bottom <= innerHeight && !searchParam) {
        setOffset((prevOffset) => prevOffset + 1)
      }
    }
  }, [searchParam])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [searchParam])

  useEffect(() => {
    getNextResults()
  }, [offset, searchParam])

  useEffect(() => {
    setLoadedImages([])
    setOffset(0)
  }, [searchParam])

  return (
    <div ref={containerRef}>
      <div className="mx-auto max-w-2xl px-4 py-9 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="mb-4 flex w-1/2 justify-start">
          <DebouncedInput
            value={searchParam}
            onChange={(value) => setSearchParam((value as string) || '')}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loadedImages.length === 0 &&
            Array.from({ length: 16 }).map((_, index) => (
              <SkeletonCard key={index} isLoading={true} />
            ))}
          {loadedImages.map((image, index) => (
            <BlurredImage key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage
