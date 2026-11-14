import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        poster?: string
        ar?: boolean
        'camera-controls'?: boolean
        'auto-rotate'?: boolean
        'ar-modes'?: string
        'shadow-intensity'?: string
      }
    }
  }
}
