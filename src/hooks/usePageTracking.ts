import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview, setUserProperties, getUserType } from '../utils/analytics';

export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        pageview(location.pathname + location.search);
    }, [location]);
}

export function usePageTrackingWithTitle(title: string) {
    const location = useLocation();

    useEffect(() => {
        document.title = title;
        pageview(location.pathname + location.search, title);
    }, [location, title]);
}

export function useUserTracking() {
    useEffect(() => {
        setUserProperties();
        
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user_role') {
                setUserProperties();
            }
        };
            
            window.addEventListener('storage', handleStorageChange);
            return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    
    return getUserType();
}

export function getPageTitle(pathname: string): string {
    const titleMap: Record<string, string> = {
        '/': 'Overview',
        '/overview': 'Overview',
        '/play': 'Play Now',
        '/contribute': 'Contributors',
        '/mission': 'Mission',
        '/events': 'Events',
        '/patch_notes': 'Patch Notes',
        '/admin/docs': 'Admin Dashboard',
        '/admin/add-article': 'Add Article',
    };

    return titleMap[pathname] || `${pathname}`;
}
