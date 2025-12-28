// Added local type definition for Cloudflare's PagesFunction to resolve compilation errors
type PagesFunction = (context: any) => any;

export const onRequest: PagesFunction = async ({ next }) => {
  const response = await next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
  return response;
};