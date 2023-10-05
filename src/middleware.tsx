import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  
  let islogin = request.cookies.get('user')
    if(islogin) {
      if(request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")){
        return NextResponse.redirect(new URL ("/dashboard", request.url))
      }
    }
    if(!islogin) {
      if(request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL ("/login", request.url))
      }
    }
}