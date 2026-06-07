export { default } from "next-auth/middleware"
export const config = {
  matcher: ["/users/:path*", "/auth/:path*", "/transactions/:path*", '/reset-password', '/withdrawals/:path*'],
};

// run npx auth secret and it will autogenerate a random value and put it in your .env.local file
// Alternatively, you can also set AUTH_SECRET, which is an alias, and is the preferred naming going forward.

