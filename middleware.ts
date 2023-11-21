import { withAuth } from 'next-auth/middleware'

export default withAuth

export const config = {
  matcher: ['/summarize', '/generate-prompt', '/register']
}
