import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/','/site', '/api/uploadthing', '/sign-in', '/sign-up']);

export default clerkMiddleware((auth, req) => {
    const url = new URL(req.url);
    const searchParams = url;
    const hostname = req.headers.get('host');

    if (!isPublicRoute(req)) {
        auth().protect();
    }

    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

    // If subdomain exists
    const customSubDomain = hostname?.split(`.${process.env.NEXT_PUBLIC_DOMAIN}`)[0];

    if (customSubDomain && customSubDomain !== 'www') {
        return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url));
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
    }

    if (url.pathname === '/' || (url.pathname === '/site' && hostname === process.env.NEXT_PUBLIC_DOMAIN)) {
        return NextResponse.redirect(new URL('/site', req.url));
    }
    
    if (url.pathname.startsWith('/agency') || url.pathname.startsWith('/subaccount')) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
        '/(api|trpc)(.*)',
    ],
};