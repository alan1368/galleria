import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: any) {
  return (
    <div className="mx-auto">
      <Navbar />
      <main className="overflow-y-visible">{children}</main>
      <Footer />
    </div>
  )
}
