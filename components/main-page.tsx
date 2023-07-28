'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { debounce } from 'lodash'

import { Database, SpotifyRow } from '@/types/supabase'

import BlurredImage from './blurred-image'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrenNpcndrcHVweHVraG1ldGloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDQ4NDg4NSwiZXhwIjoyMDA2MDYwODg1fQ.fdamgkNeO0OShb-tEt7ZrMb65IlkEJTP_KWQMJWnQZE'
)

interface Props {
  spotify: SpotifyRow[] | null
}

function MainPage({ spotify }: Props) {
  const PAGE_COUNT = 20
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadedImages, setLoadedImages] = useState(spotify!)
  const [offset, setOffset] = useState(1)
  const [isInView, setIsInView] = useState<boolean>(false)

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current
      const { bottom } = container.getBoundingClientRect()
      const { innerHeight } = window
      setIsInView(() => bottom <= innerHeight)
    }
  }

  const loadMoreTickets = async (offset: number) => {
    setOffset((prev) => prev + 1)
    const newImages = await fetchTickets(offset)
    setLoadedImages((prevImages: SpotifyRow[]) => [
      ...prevImages,
      ...newImages!,
    ])
  }

  const fetchTickets = async (offset: number) => {
    const from = offset * PAGE_COUNT
    const to = from + PAGE_COUNT - 1

    const { data } = await supabase
      .from('spotify')
      .select('*')
      .range(from, to)
      .order('addedAT', { ascending: false })

    return data
  }

  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 200)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      loadMoreTickets(offset)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <div ref={containerRef}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loadedImages.map((image, index) => {
            return <BlurredImage key={index} image={image} />
          })}
        </div>
      </div>
    </div>
  )
}

export default MainPage
