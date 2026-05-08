import * as THREE from 'three';

/**
 * Create a 3D model of an apparel product (shirt/garment)
 * Uses basic geometries to represent clothing items
 */
export function createShirtModel(color: string = '#3b82f6'): THREE.Group {
    const group = new THREE.Group();

    // Main body (rectangular box slightly tapered)
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.3);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color,
        shininess: 30,
        emissive: new THREE.Color(0x000000),
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.z = 0;
    group.add(body);

    // Left sleeve
    const sleeveGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.2);
    const sleeveMaterial = new THREE.MeshPhongMaterial({
        color,
        shininess: 30,
    });
    const leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    leftSleeve.position.set(-0.7, 0.3, 0);
    leftSleeve.rotation.z = 0.2;
    group.add(leftSleeve);

    // Right sleeve
    const rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    rightSleeve.position.set(0.7, 0.3, 0);
    rightSleeve.rotation.z = -0.2;
    group.add(rightSleeve);

    // Collar
    const collarGeometry = new THREE.BoxGeometry(0.6, 0.15, 0.28);
    const collarMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color).multiplyScalar(0.8),
        shininess: 25,
    });
    const collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.position.set(0, 0.65, 0);
    group.add(collar);

    // Front design area (raised slightly)
    const designGeometry = new THREE.BoxGeometry(0.4, 0.5, 0.01);
    const designMaterial = new THREE.MeshPhongMaterial({
        color: '#ffffff',
        shininess: 20,
        emissive: new THREE.Color(0x444444),
    });
    const design = new THREE.Mesh(designGeometry, designMaterial);
    design.position.set(0, 0.2, 0.16);
    group.add(design);

    group.scale.set(1.5, 1.5, 1.5);

    return group;
}

/**
 * Create a 3D model of a hat/cap
 */
export function createHatModel(color: string = '#ef4444'): THREE.Group {
    const group = new THREE.Group();

    // Main cap body
    const capGeometry = new THREE.ConeGeometry(0.8, 0.4, 32);
    const capMaterial = new THREE.MeshPhongMaterial({
        color,
        shininess: 25,
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.scale.set(1, 0.6, 1);
    group.add(cap);

    // Bill/visor
    const billGeometry = new THREE.ConeGeometry(0.6, 0.15, 32);
    const billMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color).multiplyScalar(0.7),
        shininess: 30,
    });
    const bill = new THREE.Mesh(billGeometry, billMaterial);
    bill.position.set(0, -0.2, 0.4);
    bill.rotation.x = Math.PI / 4;
    bill.scale.set(1, 0.5, 1);
    group.add(bill);

    // Logo area
    const logoGeometry = new THREE.CircleGeometry(0.25, 32);
    const logoMaterial = new THREE.MeshPhongMaterial({
        color: '#ffffff',
        emissive: new THREE.Color(0x333333),
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.1, 0.8);
    group.add(logo);

    group.scale.set(1.2, 1.2, 1.2);

    return group;
}

/**
 * Create a 3D pedestal/display stand
 */
export function createPedestalStand(): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(0.6, 0.8, 0.5, 32);
    const material = new THREE.MeshPhongMaterial({
        color: '#1f2937',
        shininess: 60,
    });
    const pedestal = new THREE.Mesh(geometry, material);
    pedestal.receiveShadow = true;

    return pedestal;
}

/**
 * Create a display shelf/wall
 */
export function createDisplayShelf(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(10, 0.2, 1);
    const material = new THREE.MeshPhongMaterial({
        color: '#374151',
        shininess: 40,
    });
    const shelf = new THREE.Mesh(geometry, material);
    shelf.receiveShadow = true;

    return shelf;
}

/**
 * Get random apparel color
 */
export function getRandomApparelColor(): string {
    const colors = [
        '#000000', // Black
        '#ffffff', // White
        '#3b82f6', // Blue
        '#ef4444', // Red
        '#10b981', // Green
        '#f59e0b', // Amber
        '#8b5cf6', // Purple
        '#06b6d4', // Cyan
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Create a product with random model and color
 */
export function createRandomProduct(): THREE.Group {
    const group = new THREE.Group();
    const color = getRandomApparelColor();
    const modelType = Math.random() > 0.5 ? 'shirt' : 'hat';

    const product = modelType === 'shirt' ? createShirtModel(color) : createHatModel(color);
    group.add(product);

    return group;
}
