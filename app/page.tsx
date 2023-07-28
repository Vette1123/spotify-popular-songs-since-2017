import { supabase } from '@/lib/db'
import BlurredImage from '@/components/blurred-image'
import MainPage from '@/components/main-page'

export default async function IndexPage() {
  let { data: spotify } = await supabase
    .from('spotify')
    .select('*')
    .order('addedAT', { ascending: false })
    .limit(20)

  return <MainPage spotify={spotify} />
}
