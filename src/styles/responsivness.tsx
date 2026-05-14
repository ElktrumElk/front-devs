import { useEffect, useState } from 'react';


export const styleResponsive = () => {

    const getViewportMode = (): 'mobile' | 'tablet' | 'desktop' | 'miniDesktop' => {
        if (typeof window === 'undefined') return 'desktop';

        const width = window.innerWidth;
        if (width <= 500) return 'mobile';
        if (width <= 1024) return 'tablet';
        if (width <= 1600) return 'miniDesktop';
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
        isDesktop: viewportMode === 'desktop',
        isMiniDesktop: viewportMode === 'miniDesktop'
    }
}