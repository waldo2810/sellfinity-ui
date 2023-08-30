import { authMiddleware } from '@clerk/nextjs'

import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'never'
})

export default authMiddleware({
  beforeAuth: req => {
    return intlMiddleware(req)
  },

  publicRoutes: ['/api/:path*']
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
