import { NextRequest, NextResponse } from 'next/server'

import { PAGE_COUNT } from '@/lib/constants'
import { supabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  if (!request.body)
    return new NextResponse(JSON.stringify({ message: 'No body provided' }), {
      status: 400,
    })

  const { offset, searchParam } = await request.json()

  if (!offset && offset !== 0)
    return new NextResponse(JSON.stringify({ message: 'No offset provided' }), {
      status: 400,
    })

  const from = offset * (searchParam ? 100 : PAGE_COUNT)
  const to = from + (searchParam ? 100 : PAGE_COUNT) - 1

  try {
    const query = supabase
      .from('spotify')
      .select('*')
      .range(from, to)
      .order('addedAT', { ascending: false })

    if (searchParam) {
      query.ilike('artistName', `%${searchParam}%`)
    }

    const { data: spotify, error } = await query

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
