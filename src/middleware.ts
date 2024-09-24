import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/site', '/sign-in', '/sign-up', '/api/uploadthing']);

const isPublicApiRoute = createRouteMatcher([
    "/api/uploadthing"
])


export default clerkMiddleware((auth, req) => {
    const url = new URL(req.url);
    const searchParams = url.searchParams.toString();
    const hostname = req.headers;
    const isApiRequest = url.pathname.startsWith("/api")


    // If the request is for a protected route and the user is not logged in

    if (!isPublicRoute(req)) {
        auth().protect();
    }

    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

    // If subdomain exists
    const customSubDomain = hostname
        .get('host')
        ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
        .filter(Boolean)[0]

    if (customSubDomain) {
        return NextResponse.rewrite(
            new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
        )
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
    }

    if (
        url.pathname === '/' ||
        (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
        return NextResponse.rewrite(new URL('/site', req.url))
    }

    if (
        url.pathname.startsWith('/agency') ||
        url.pathname.startsWith('/subaccount')
    ) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
    }
    
    // If the request is for a protected API and the user is not logged in
    if (isApiRequest && !isPublicApiRoute(req)) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }
});



export const config = {
    matcher: [
        '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
        '/(api|trpc)(.*)',
    ],
};
