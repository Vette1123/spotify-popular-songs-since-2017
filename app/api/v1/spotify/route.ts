import { NextRequest, NextResponse } from 'next/server'

import { PAGE_COUNT } from '@/lib/constants'
import { supabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  if (!request.body)
    return new NextResponse(JSON.stringify({ message: 'No body provided' }), {
      status: 400,
    })

  const { offset } = await request.json()

  if (!offset)
    return new NextResponse(JSON.stringify({ message: 'No offset provided' }), {
      status: 400,
    })

  const from = offset * PAGE_COUNT
  const to = from + PAGE_COUNT - 1

  try {
    const { data: spotify, error } = await supabase
      .from('spotify')
      .select('*')
      .range(from, to)
      .order('addedAT', { ascending: false })

    if (error)
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 500,
      })

    return new NextResponse(JSON.stringify(spotify), {
      status: 200,
    })
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}
