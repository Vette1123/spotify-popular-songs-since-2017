'use client'

import { useState } from 'react'
import Image from 'next/image'

import { SpotifyRow } from '@/types/supabase'
import { cn } from '@/lib/utils'

function BlurredImage({ image }: { image: SpotifyRow }) {
  const [isLoading, setLoading] = useState<boolean>(true)

  return (
    <a href={image.trackURL as string} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          alt="Sadge"
          src={image.albumImage as string}
          fill
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        {image.trackName as string}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {image.artistName as string}
      </p>
    </a>
  )
}

export default BlurredImage
