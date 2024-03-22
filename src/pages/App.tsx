import Header from '../components/custom/Header'
import { TrendingList } from '../components/custom/TrendingList'
import { Toaster } from "@/components/ui/toaster"

const App = () => {

  return (
    <>
      <Toaster/>
      <Header/>
      <TrendingList/>
    </>
  )
}

export default App
