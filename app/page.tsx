import { supabase } from '@/lib/db'
import BlurredImage from '@/components/blurred-image'

export default async function IndexPage() {
  let { data: spotify } = await supabase
    .from('spotify')
    .select('*')
    .order('addedAT', { ascending: false })
    .limit(300)

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {spotify ? (
          spotify?.map((image) => <BlurredImage key={image.id} image={image} />)
        ) : (
          <p>Nothing to see here</p>
        )}
      </div>
    </div>
  )
}
