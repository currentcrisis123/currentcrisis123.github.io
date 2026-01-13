declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const GA_DEBUG_MODE = import.meta.env.VITE_GA_DEBUG_MODE === 'true';
export const ENV = import.meta.env.VITE_ENV || import.meta.env.MODE || 'development';

// User type detection
export function getUserType(): string {
    // Check for admin or developer indicators
    const isAdmin = window.location.pathname.includes('/admin');
    const isDeveloper = ENV === 'development' || window.location.hostname === 'localhost';
    
    if (isAdmin) return 'admin';
    if (isDeveloper) return 'developer';

    return 'end_user';
}

export function initGA() {
    if (!GA_MEASUREMENT_ID) {
        console.warn('Google Analytics measurement ID not found');
        return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };

    const userType = getUserType();
    const sessionId = `${ENV}_${userType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        debug_mode: GA_DEBUG_MODE,
        cookie_domain: 'auto',
        custom_map: {
            custom_dimension_1: 'environment',
            custom_dimension_2: 'user_type',
            custom_dimension_3: 'session_type'
        },
        send_page_view: false,
    });

    window.gtag('set', 'user_properties', {
        environment: ENV,
        user_type: userType,
        session_type: `${ENV}_${userType}`,
    });
    
    window.gtag('set', {
        environment: ENV,
        user_type: userType,
        session_id: sessionId,
        custom_dimension_1: ENV,
        custom_dimension_2: userType,
        custom_dimension_3: `${ENV}_${userType}`,
    });

    setUserProperties();
    
    if (GA_DEBUG_MODE) {
        console.log('Analytics initialized:', {
            measurementId: GA_MEASUREMENT_ID,
            environment: ENV,
            userType: getUserType(),
            debugMode: GA_DEBUG_MODE
        });
    }
}

export function pageview(path: string, title?: string) {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;
    
    const pageTitle = title || document.title;
    const userType = getUserType();
   
    window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: path,
        environment: ENV,
        is_development: ENV === 'development',
        user_type: userType,
        session_type: `${ENV}_${userType}`,
        event_timestamp: Date.now(),
        custom_dimension_1: ENV,
        custom_dimension_2: userType,
        custom_dimension_3: `${ENV}_${userType}`,
    });

    if (GA_DEBUG_MODE) {
        console.log('Analytics: Page view tracked', {
            path,
            title: pageTitle,
            url: window.location.href,
            environment: ENV,
            userType,
            timestamp: new Date().toISOString()
        });
    }
}

export function trackEvent(action: string, category?: string, label?: string, value?: number) {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

    const userType = getUserType();

    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        environment: ENV,
        is_development: ENV === 'development',
        user_type: userType,
        session_type: `${ENV}_${userType}`,
        event_timestamp: Date.now(),
        custom_dimension_1: ENV,
        custom_dimension_2: userType,
        custom_dimension_3: `${ENV}_${userType}`,
    });

    if (GA_DEBUG_MODE) {
        console.log('Analytics: Event tracked', {
            action,
            category,
            label,
            value,
            environment: ENV,
            userType,
            timestamp: new Date().toISOString()
        });
    }
}

export function getEnvironmentFilter() {
    return {
        development: ENV === 'development',
        production: ENV === 'production',
        current_env: ENV,
        measurement_id: GA_MEASUREMENT_ID
    };
}

export function trackEnvironmentEvent(action: string, data?: Record<string, any>) {
    trackEvent(action, 'environment', ENV, undefined);
    
    if (data) {
        window.gtag('event', 'custom_data', {
            ...data,
            environment: ENV,
            event_timestamp: Date.now()
        });
    }
}

export function isAnalyticsEnabled(): boolean {
    return !!GA_MEASUREMENT_ID && typeof window.gtag === 'function';
}

export function getAnalyticsConfig() {
    return {
        measurementId: GA_MEASUREMENT_ID,
        debugMode: GA_DEBUG_MODE,
        enabled: isAnalyticsEnabled(),
    };
}

export function setUserProperties() {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;
    
    const userType = getUserType();
    
    window.gtag('set', 'user_properties', {
        environment: ENV,
        user_type: userType,
        session_type: `${ENV}_${userType}`,
    });
    
    if (GA_DEBUG_MODE) {
        console.log('Analytics: User properties set', {
            environment: ENV,
            user_type: userType,
            session_type: `${ENV}_${userType}`,
        });
    }
}

export function setUserType(type: 'admin' | 'developer' | 'end_user') {
    localStorage.setItem('user_role', type);
    setUserProperties();
    
    if (GA_DEBUG_MODE) {
        console.log('Analytics: User type manually set to', type);
    }
}

export function trackUserLogin(userType: string, userId?: string) {
    trackEvent('login', 'authentication', userType);
    
    if (userId) {
        window.gtag('set', { user_id: userId });
    }
    
    setUserType(userType as any);
}