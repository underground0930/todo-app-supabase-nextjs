import '../styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log(`FCP: ${metric.value.toFixed(2)}`)
      break
    case 'LCP':
      console.log(`LCP: ${metric.value.toFixed(2)}`)
      break
    case 'TTFB':
      console.log(`TTFB: ${metric.value.toFixed(2)}`)
      break
    case 'Next.js-hydration':
      console.log(
        `Hydration: ${metric.startTime.toFixed(2)} -> ${Math.round(
          metric.startTime + metric.value
        ).toFixed(2)}`
      )
      break
    default:
      break
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
