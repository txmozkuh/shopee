import Header from '@components/Header'
import Footer from '@components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='bg-[#f5f5f5]'>
      <Header />
      <div className='py-2'>{children}</div>

      <Footer />
    </div>
  )
}
