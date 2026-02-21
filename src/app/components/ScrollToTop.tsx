import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Resets scroll position to the top of the page on every route change.
 * Place this inside <BrowserRouter> so it has access to the router context.
 */
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Use instant scroll so there's no weird animated scroll when navigating
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}
