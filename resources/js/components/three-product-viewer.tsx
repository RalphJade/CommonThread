'use client';

import { OrbitControls, PerspectiveCamera, Float, Environment } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import type * as THREE from 'three';
import { createShirtModel, createHatModel, createPedestalStand } from '@/lib/three-product-models';

interface ProductViewerProps {
    productType?: 'shirt' | 'hat' | 'random';
    productColor?: string;
    autoRotate?: boolean;
    className?: string;
}

function ProductModel({
    productType = 'shirt',
    productColor = '#3b82f6',
    autoRotate = true,
}: Pick<ProductViewerProps, 'productType' | 'productColor' | 'autoRotate'>) {
    const meshRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.clear();
            const product =
                productType === 'shirt'
                    ? createShirtModel(productColor)
                    : createHatModel(productColor);
            meshRef.current.add(product);
        }
    }, [productType, productColor]);

    useFrame((state) => {
        if (meshRef.current && autoRotate) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={0.75} rotationIntensity={0.2}>
            <group ref={meshRef} />
        </Float>
    );
}

function Lighting() {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[10, 15, 10]}
                intensity={0.8}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.3} color={0x8888ff} />
            <pointLight position={[10, -10, 10]} intensity={0.2} color={0xff8888} />
        </>
    );
}

function Background() {
    return (
        <mesh position={[0, 0, -5]}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color="#f3f4f6" />
        </mesh>
    );
}

export function ProductViewer({
    productType = 'shirt',
    productColor = '#3b82f6',
    autoRotate = true,
    className = '',
}: ProductViewerProps) {
    return (
        <div className={`h-full w-full bg-gray-50 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <Lighting />
                <Background />
                <ProductModel
                    productType={productType}
                    productColor={productColor}
                    autoRotate={autoRotate}
                />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    autoRotate={autoRotate}
                    autoRotateSpeed={4}
                />
            </Canvas>
        </div>
    );
}
