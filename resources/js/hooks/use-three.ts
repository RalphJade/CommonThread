import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Hook to handle window resize for canvas
 */
export function useCanvasResize(containerRef: React.RefObject<HTMLDivElement>) {
    const [size, setSize] = useState({
        width: 800,
        height: 600,
    });

    useEffect(() => {
        if (!containerRef.current) {
return;
}

        const updateSize = () => {
            if (containerRef.current) {
                setSize({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };

        updateSize();

        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(containerRef.current);

        const handleResize = () => updateSize();
        window.addEventListener('resize', handleResize);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef]);

    return size;
}

/**
 * Hook to load a 3D model with error handling
 */
export function useThreeModel<T extends THREE.Object3D>(
    loader: () => Promise<T>,
    dependencies: unknown[] = [],
): { model: T | null; loading: boolean; error: Error | null } {
    const [model, setModel] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        setLoading(true);
        setError(null);

        loader()
            .then((loadedModel) => {
                if (mounted) {
                    setModel(loadedModel);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (mounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, dependencies);

    return { model, loading, error };
}

/**
 * Hook for mouse position tracking in 3D space
 */
export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mousePosition;
}

/**
 * Hook to track scroll velocity
 */
export function useScrollVelocity() {
    const [velocity, setVelocity] = useState(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        let animationFrameId: number;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const newVelocity = currentScrollY - lastScrollY;

            // Smooth out the velocity
            setVelocity((prev) => prev * 0.9 + newVelocity * 0.1);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return velocity;
}

/**
 * Hook for performing raycasting
 */
export function useRaycast(
    scene: THREE.Scene | null,
    camera: THREE.Camera | null,
) {
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());

    const getRaycastObjects = (
        objects: THREE.Object3D[],
        event: MouseEvent | React.MouseEvent,
    ): THREE.Intersection[] => {
        if (!scene || !camera) {
return [];
}

        const rect = (event.target as HTMLElement).getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, camera);

        return raycasterRef.current.intersectObjects(objects);
    };

    return { getRaycastObjects };
}

/**
 * Hook to debounce 3D updates
 */
export function useDebouncedThreeUpdate<T>(
    updateFn: (value: T) => void,
    delay: number = 200,
) {
    const timeoutRef = useRef<NodeJS.Timeout>();

    const debouncedUpdate = (value: T) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            updateFn(value);
        }, delay);
    };

    return debouncedUpdate;
}

/**
 * Hook to manage Three.js scene lifecycle
 */
export function useThreeScene(
    containerRef: React.RefObject<HTMLDivElement>,
    options: {
        gamma?: boolean;
        antialias?: boolean;
        shadows?: boolean;
    } = {},
) {
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
return;
}

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf3f4f6);
        sceneRef.current = scene;

        // Camera setup
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 0, 5);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: options.antialias ?? true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        if (options.gamma) {
            renderer.outputColorSpace = THREE.SRGBColorSpace;
        }

        if (options.shadows) {
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        }

        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) {
return;
}

            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            containerRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [options.antialias, options.gamma, options.shadows]);

    return {
        scene: sceneRef.current,
        camera: cameraRef.current,
        renderer: rendererRef.current,
    };
}

/**
 * Utility to convert Tailwind color names to hex codes
 */
export const colorMap: Record<string, string> = {
    slate: '#64748b',
    gray: '#6b7280',
    zinc: '#71717a',
    neutral: '#737373',
    stone: '#78716c',
    red: '#ef4444',
    orange: '#f97316',
    amber: '#f59e0b',
    yellow: '#eab308',
    lime: '#84cc16',
    green: '#22c55e',
    emerald: '#10b981',
    teal: '#14b8a6',
    cyan: '#06b6d4',
    sky: '#0ea5e9',
    blue: '#3b82f6',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    purple: '#a855f7',
    fuchsia: '#d946ef',
    pink: '#ec4899',
    rose: '#f43f5e',
};

/**
 * Get a color from the map
 */
export function getTailwindColor(name: keyof typeof colorMap): string {
    return colorMap[name];
}
