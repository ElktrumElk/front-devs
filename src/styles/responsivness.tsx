import { useEffect, useState } from 'react';


export const styleResponsive = () => {

    const getViewportMode = (): 'mobile' | 'tablet' | 'desktop' => {
        if (typeof window === 'undefined') return 'desktop';

        const width = window.innerWidth;
        if (width <= 750) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    };

    const [viewportMode, setViewportMode] = useState(getViewportMode);

    useEffect(() => {

        const handleResize = () => {
            setViewportMode(getViewportMode());
        };

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty array ensures this only mounts once

    return {
        isMobile: viewportMode === 'mobile',
        isTablet: viewportMode === 'tablet',
        isDesktop: viewportMode === 'desktop'
    }
}