import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/site', '/api/uploadthing', '/sign-in', '/sign-up']);

const isPublicApiRoute = createRouteMatcher([
    "/api/uploadthing"
])
export default clerkMiddleware((auth, req) => {
    const url = new URL(req.url);
    const searchParams = url.searchParams.toString();
    const hostname = req.headers.get('host');
    const isApiRequest = url.pathname.startsWith("/api")


    let debugInfo = `URL: ${url}\nSearch Params: ${searchParams}\nHostname: ${hostname}\n`;

    if (!isPublicRoute(req)) {
        auth().protect();
    }

    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    debugInfo += `Path with Search Params: ${pathWithSearchParams}\n`;

    // If subdomain exists
    const customSubDomain = hostname?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0];
    debugInfo += `Custom Subdomain: ${customSubDomain}\n`;

    if (customSubDomain) {
        debugInfo += `Rewriting to: /${customSubDomain}${pathWithSearchParams}\n`;
        return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)).headers.set('X-Debug-Info', debugInfo);
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        debugInfo += `Redirecting to: /agency/sign-in\n`;
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url)).headers.set('X-Debug-Info', debugInfo);
    }

    if (url.pathname === '/' || (url.pathname === '/site' && hostname === process.env.NEXT_PUBLIC_DOMAIN)) {
        debugInfo += `Rewriting to: /site\n`;
        return NextResponse.rewrite(new URL('/site', req.url)).headers.set('X-Debug-Info', debugInfo);
    }
    
    if (url.pathname === '/') {
        debugInfo += `Rewriting to: /site\n`;
        return NextResponse.rewrite(new URL('/site', req.url)).headers.set('X-Debug-Info', debugInfo);
    }
    
    if (url.pathname.startsWith('/agency') || url.pathname.startsWith('/subaccount')) {
        debugInfo += `Rewriting to: ${pathWithSearchParams}\n`;
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url)).headers.set('X-Debug-Info', debugInfo);
    }

    // If the request is for a protected API and the user is not logged in
    if (isApiRequest && !isPublicApiRoute(req)) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }
    
    // Handle /test route
    if (url.pathname === '/test') {
        debugInfo += `Handling /test route\n`;
        const response = new NextResponse('Successful message. Redirecting to /site...', { status: 200 });
        response.headers.set('Refresh', '3;url=/site'); // Redirect after 3 seconds
        response.headers.set('X-Debug-Info', debugInfo);
        return response;
    }

    debugInfo += `Proceeding to NextResponse.next()\n`;
    return NextResponse.next().headers.set('X-Debug-Info', debugInfo);
});

export const config = {
    matcher: [
        '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
        '/(api|trpc)(.*)',
    ],
};
