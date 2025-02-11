import { Archivo } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const archivo = Archivo({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <main className={archivo.className}>
      <Component {...pageProps} />
    </main>
  )
}