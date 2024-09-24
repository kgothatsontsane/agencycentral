import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/site', '/sign-in', '/sign-up', '/api/uploadthing'];

export default clerkMiddleware(async (auth, req) => {
    const { userId } = auth(req);
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';
    const searchParams = url.searchParams.toString();
    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

    // Before Auth Middleware
    if (!userId) {
        // Redirect root ('/') to '/site' if user is not authenticated
        if (url.pathname === '/') {
            return NextResponse.rewrite(new URL('/site', req.url));
        }
        
        if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
            return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
        }
        return NextResponse.next();
        
    }
    
    
    // After Auth Middleware
    const customSubDomain = hostname.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0];
    
    if (customSubDomain) {
        return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url));
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
    }

    if (url.pathname === '/' || (url.pathname === '/site' && hostname === process.env.NEXT_PUBLIC_DOMAIN)) {
        return NextResponse.rewrite(new URL('/site', req.url));
    }

    if (url.pathname.startsWith('/agency') || url.pathname.startsWith('/subaccount')) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }

    return NextResponse.next();
}, { publicRoutes });

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};