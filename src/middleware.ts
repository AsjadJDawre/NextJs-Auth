import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
const path = request.nextUrl.pathname;
const isPublicPath = path ==='/login' || path ==='/signup'
const token = request.cookies.get('token')?.value || '';
// redirecting authenticated user to  somewhere
if(isPublicPath && token){
  return NextResponse.redirect(new URL('/',request.nextUrl))
}
// redirecting  user to  login

if(!isPublicPath && !token){    
  return NextResponse.redirect(new URL('/login',request.nextUrl))   
}

}
 
export const config = {
  matcher: ['/','/profile','/signup','/login'],
}