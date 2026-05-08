'use client';

import { OrbitControls, PerspectiveCamera, Grid, Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import type * as THREE from 'three';
import {
    createShirtModel,
    createHatModel,
    createPedestalStand,
    createDisplayShelf,
    getRandomApparelColor,
} from '@/lib/three-product-models';

interface StoreDisplayProps {
    className?: string;
    productCount?: number;
}

interface ProductDisplay {
    id: string;
    position: [number, number, number];
    type: 'shirt' | 'hat';
    color: string;
    rotation?: [number, number, number];
}

function generateStoreLayout(count: number): ProductDisplay[] {
    const products: ProductDisplay[] = [];
    const gridSize = Math.ceil(Math.sqrt(count));
    const spacing = 3;

    for (let i = 0; i < count; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const x = (col - gridSize / 2) * spacing;
        const z = (row - gridSize / 2) * spacing;

        products.push({
            id: `product-${i}`,
            position: [x, 0, z],
            type: Math.random() > 0.5 ? 'shirt' : 'hat',
            color: getRandomApparelColor(),
            rotation: [0, Math.random() * Math.PI * 2, 0],
        });
    }

    return products;
}

function StoreProduct({ product }: { product: ProductDisplay }) {
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.clear();

            // Add pedestal
            const pedestal = createPedestalStand();
            pedestal.position.y = 0;
            groupRef.current.add(pedestal);

            // Add product on top
            const productModel =
                product.type === 'shirt'
                    ? createShirtModel(product.color)
                    : createHatModel(product.color);

            const productOffset = product.type === 'shirt' ? 1.2 : 0.8;
            productModel.position.y = productOffset;

            if (product.rotation) {
                productModel.rotation.set(
                    product.rotation[0],
                    product.rotation[1],
                    product.rotation[2],
                );
            }

            groupRef.current.add(productModel);
        }
    }, [product]);

    useFrame((state) => {
        if (groupRef.current) {
            // Slight sway animation
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
        }
    });

    return (
        <group
            ref={groupRef}
            position={product.position}
        />
    );
}

function StoreEnvironment() {
    const floorRef = useRef<THREE.Mesh>(null);

    return (
        <>
            {/* Floor */}
            <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#e5e7eb" metalness={0.1} roughness={0.8} />
            </mesh>

            {/* Back wall */}
            <mesh position={[0, 5, -15]} receiveShadow>
                <planeGeometry args={[50, 20]} />
                <meshStandardMaterial color="#f3f4f6" metalness={0} roughness={1} />
            </mesh>

            {/* Side walls */}
            <mesh position={[-25, 5, 0]} receiveShadow>
                <planeGeometry args={[30, 20]} />
                <meshStandardMaterial color="#f9fafb" metalness={0} roughness={1} />
            </mesh>
            <mesh position={[25, 5, 0]} receiveShadow>
                <planeGeometry args={[30, 20]} />
                <meshStandardMaterial color="#f9fafb" metalness={0} roughness={1} />
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 12, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} />
            </mesh>

            {/* Grid floor visualization */}
            <Grid args={[50, 50]} cellSize={1} cellColor="#d1d5db" sectionSize={5} sectionColor="#9ca3af" fadeStrength={0.5} fadeDistance={50} infiniteGrid={false} />
        </>
    );
}

function StoreLighting() {
    return (
        <>
            <ambientLight intensity={0.7} />
            <directionalLight
                position={[15, 20, 15]}
                intensity={0.9}
                castShadow
                shadow-mapSize={2048}
            />
            <directionalLight position={[-15, 15, -15]} intensity={0.4} color={0xffffff} />
            <pointLight position={[0, 8, 0]} intensity={0.3} color={0xffffff} />
        </>
    );
}

export function StoreDisplay({ className = '', productCount = 9 }: StoreDisplayProps) {
    const [products, setProducts] = useState<ProductDisplay[]>([]);

    useEffect(() => {
        setProducts(generateStoreLayout(productCount));
    }, [productCount]);

    return (
        <div className={`h-full w-full ${className}`}>
            <Canvas
                camera={{ position: [8, 8, 8], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                shadows
            >
                <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
                <StoreLighting />
                <StoreEnvironment />

                {products.map((product) => (
                    <StoreProduct key={product.id} product={product} />
                ))}

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    zoomSpeed={0.5}
                    autoRotate={true}
                    autoRotateSpeed={1}
                />
            </Canvas>
        </div>
    );
}
