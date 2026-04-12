"use client";

import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Github, Home, FolderOpen, Mail, Code, Box, Rocket, ExternalLink,
    Play, ChevronLeft, ChevronRight, X, GitBranch, Star, Users,
    Menu, ArrowRight, Layers, Monitor, Wrench, Sparkles, Award
} from 'lucide-react';

/** Display order: flagship work first, then the rest by original id. */
const FEATURED_FIRST_ORDER = [13, 19, 12, 20];

const projectsData = [
    {
        id: 1,
        title: "PDF Stamper Tool",
        description: "A powerful PDF stamping tool designed for welding map inspections. It allows users to add watermarks, timestamps, and annotations to ensure secure and professional document handling.",
        video: "/assets/projects/pdf-stamper/pdf-stamper.mp4",
        screenshots: [
            "/assets/projects/pdf-stamper/pdf-stamper-1.png",
            "/assets/projects/pdf-stamper/pdf-stamper-2.png",
            "/assets/projects/pdf-stamper/pdf-stamper-3.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://pdf-stamper-tool-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/pdf-stamp-app",
        color: "#ff6b6b",
        category: "Design Tool",
    },
    {
        id: 2,
        title: "Dimensions App",
        description: "An advanced app that enables accurate measurement, annotation, and visualization for various inspection workflows, tailored for professionals.",
        video: "/assets/projects/dimensions-app/video.mp4",
        screenshots: [
            "/assets/projects/dimensions-app/img.png",
            "/assets/projects/dimensions-app/img_1.png",
            "/assets/projects/dimensions-app/img_2.png",
            "/assets/projects/dimensions-app/img_3.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://dimensions-app-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/dimensions-app",
        color: "#4ecdc4",
        category: "Design Tool",
    },
    {
        id: 3,
        title: "Logoflow App",
        description: "A tool for designing and managing logos efficiently, with multiple customization options for branding professionals.",
        video: "",
        screenshots: [
            "/assets/projects/logoflow/img.png",
            "/assets/projects/logoflow/img_1.png",
            "/assets/projects/logoflow/img_2.png",
            "/assets/projects/logoflow/img_3.png",
            "/assets/projects/logoflow/img_4.png",
            "/assets/projects/logoflow/img_5.png",
            "/assets/projects/logoflow/img_6.png",
            "/assets/projects/logoflow/img_7.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://logoflow-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/logoflow-app",
        color: "#45b7d1",
        category: "Design Tool",
    },
    {
        id: 4,
        title: "DFD Designer Tool",
        description: "A tool for designing and analyzing Data Flow Diagrams (DFDs) with robust in-house services.",
        video: "/assets/projects/dfd-designer-tool/video.mp4",
        screenshots: [
            "/assets/projects/dfd-designer-tool/img.png",
            "/assets/projects/dfd-designer-tool/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://dfd-designer-tool-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/dfd-designer-tool",
        color: "#feca57",
        category: "Design Tool",
    },
    {
        id: 5,
        title: "Weld Map App",
        description: "A comprehensive application tailored for managing weld mapping documentation, providing tools for annotation, process visualization, and reporting.",
        video: "/assets/projects/weld-map/weld-map.mp4",
        screenshots: [
            "/assets/projects/weld-map/weld-map-1.png",
            "/assets/projects/weld-map/weld-map-2.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://weld-map-app-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/weld-map-app",
        color: "#a55eea",
        category: "Design Tool",
    },
    {
        id: 6,
        title: "Map Plan Marker",
        description: "A tool for marking and annotating plans, particularly useful in welding and construction workflows, ensuring efficient documentation.",
        video: "/assets/projects/map-marker/video.mp4",
        screenshots: [
            "/assets/projects/map-marker/img.png",
            "/assets/projects/map-marker/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://map-plan-marker-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/map-plan-marker",
        color: "#26de81",
        category: "Design Tool",
    },
    {
        id: 7,
        title: "Football Easy Coach",
        description: "A platform designed to help football coaches create, manage, and execute strategies effortlessly.",
        video: "",
        screenshots: [
            "/assets/projects/football-easy-coach/img.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://football-easy-coach-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/football-easy-coach",
        color: "#fd79a8",
        category: "Design Tool",
    },
    {
        id: 8,
        title: "Build Studio",
        description: "An application to assist in setting up studio environments for seamless in-house operations.",
        video: "",
        screenshots: [
            "/assets/projects/build-studio/img.png",
            "/assets/projects/build-studio/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://build-studio-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/build-studio",
        color: "#fdcb6e",
        category: "Design Tool",
    },
    {
        id: 9,
        title: "T-Shirt Designer",
        description: "An interactive application for designing T-shirts with real-time preview and customization options.",
        video: "",
        screenshots: [
            "/assets/projects/t-shirt-designer/img.png",
            "/assets/projects/t-shirt-designer/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://tshirt-designer-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/tshirt-designer",
        color: "#6c5ce7",
        category: "Design Tool",
    },
    {
        id: 10,
        title: "Generate Image",
        description: "An innovative tool that generates and customizes images based on user inputs, streamlining workflows for graphic and visual design.",
        video: "",
        screenshots: [
            "/assets/projects/generate-image/img.png",
            "/assets/projects/generate-image/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://generate-image-tool-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/generate-image-tool",
        color: "#00b894",
        category: "Design Tool",
    },
    {
        id: 11,
        title: "Glorify Template Designer",
        description: "Professional template designer for app.glorify.com — built for clients to create and customize templates with an intuitive drag-and-drop editor and export workflows.",
        video: "",
        screenshots: [],
        technologies: ["React", "Next.js", "Canvas API", "Fabric.js", "Node.js", "Tailwind CSS", "TypeScript"],
        demo: "https://app.glorify.com",
        source: "#",
        color: "#e17055",
        category: "Design Tool",
    },
    {
        id: 12,
        title: "Dirtface Shop Drawing Designer",
        description: "A high-performance, embeddable shop drawing designer (React + Konva) for creating professional technical drawings. Features a multi-layer canvas architecture with grid, blueprint, structure, dimensions, and annotations layers. Supports template/model workflows, boolean geometry operations via Paper.js, and produces vector PDF output via svg2pdf.js pipeline. Designed for large documents (3,000-5,000 objects) with optimized rendering.",
        video: "",
        screenshots: [
            "/assets/projects/shop-drawing-designer/shop-drawing-editor.png",
            "/assets/projects/shop-drawing-designer/shop-drawing-export.png",
            "/assets/projects/shop-drawing-designer/shop-drawing-templates.png",
        ],
        technologies: ["React", "Konva", "Paper.js", "Tailwind CSS", "Radix UI", "svg2pdf.js", "jsPDF"],
        demo: "https://designer.dirtface.com",
        source: "#",
        color: "#0984e3",
        category: "Design Tool",
        featured: true,
    },
    {
        id: 13,
        title: "Dirtface.com — Fence Platform",
        description: "A full B2B SaaS platform for fence contractors. Includes fence estimating and quoting, visual fence design on canvas/map/blueprint (Fabric.js), CRM with customer management, crew scheduling with calendar views, billing with invoices and payments (Stripe), inventory management, shop drawings library, customer portal for proposals, and a wholesale B2B storefront — all in a multi-tenant architecture.",
        video: "",
        screenshots: [
            "/assets/projects/dirtface-platform/dirtface-dashboard.png",
            "/assets/projects/dirtface-platform/dirtface-fence-designer.png",
            "/assets/projects/dirtface-platform/dirtface-crm.png",
        ],
        technologies: ["Next.js", "React", "Redux", "Fabric.js", "Tailwind CSS", "Stripe", "NextAuth", "Socket.io", "Sanity"],
        demo: "https://dirtface.com",
        source: "#",
        color: "#00cec9",
        category: "SaaS Platform",
        featured: true,
    },
    {
        id: 14,
        title: "Easy Coach Club Editor",
        description: "Custom editor for Easy Coach Club — built the core editor experience for coaches to create and manage content and strategies on the platform.",
        video: "",
        screenshots: [],
        technologies: ["React", "Next.js", "Canvas API", "Node.js", "Tailwind CSS"],
        demo: "https://www.easycoach.club",
        source: "#",
        color: "#fd79a8",
        category: "Design Tool",
    },
    {
        id: 15,
        title: "AI Canvas Studio",
        description: "AI-powered canvas studio for creative workflows — combines canvas-based design with AI generation and editing for images and layouts.",
        video: "",
        screenshots: [],
        technologies: ["React", "Next.js", "Canvas API", "AI/ML APIs", "Node.js", "Tailwind CSS"],
        demo: "#",
        source: "#",
        color: "#a29bfe",
        category: "Design Tool",
    },
    {
        id: 16,
        title: "Shirt Designers",
        description: "Custom shirt designer applications for clients — interactive editors with real-time preview, print-area mapping, and order integration.",
        video: "",
        screenshots: [],
        technologies: ["React", "Next.js", "Canvas API", "Fabric.js", "Node.js", "Tailwind CSS"],
        demo: "#",
        source: "#",
        color: "#6c5ce7",
        category: "Design Tool",
    },
    {
        id: 17,
        title: "Template Designers",
        description: "Template design tools for various clients — drag-and-drop editors for social posts, marketing assets, and branded templates with export options.",
        video: "",
        screenshots: [],
        technologies: ["React", "Next.js", "Canvas API", "Fabric.js", "Node.js", "Tailwind CSS"],
        demo: "#",
        source: "#",
        color: "#00b894",
        category: "Design Tool",
    },
    {
        id: 18,
        title: "Le Faire Part Ethique — Product Customizer",
        description: "WooCommerce product customizer for Le Faire Part Ethique — in-product editor for personalized invitations and print products with admin controls.",
        video: "",
        screenshots: [],
        technologies: ["React", "WordPress", "WooCommerce", "REST API", "Canvas API", "PHP"],
        demo: "https://lefairepartethique.fr/product-customizer/",
        source: "#",
        color: "#e84393",
        category: "Other",
    },
    {
        id: 19,
        title: "Fence Designer Tool",
        description: "A Fabric.js canvas-based fence layout designer embedded within the Dirtface quoting workflow. Supports blueprint upload, Google Maps satellite view integration, drawing fence sections with posts and gates, automatic material takeoffs, and measurement annotations — all tied to the estimate for instant pricing.",
        video: "",
        screenshots: [
            "/assets/projects/fence-designer/fence-designer-canvas.png",
            "/assets/projects/fence-designer/fence-designer-gate.png",
        ],
        technologies: ["React", "Fabric.js", "Google Maps API", "Canvas API", "Tailwind CSS"],
        demo: "https://designer.dirtface.com",
        source: "#",
        color: "#fdcb6e",
        category: "Design Tool",
        featured: true,
    },
    {
        id: 20,
        title: "MEP Design Tool",
        description: "A browser-based MEP/heating layout editor for engineers. Import PDF floor plans, calibrate real-world scale, trace rooms and walls, lay out hydronic piping and equipment (radiators, boilers, ASHP), run heating calculations (heat loss, flow rates, pipe sizing, pressure drop), and export professional PDF/PNG drawings with title blocks. Built with a multi-layer Konva canvas architecture and a Fastify + Prisma backend.",
        video: "",
        screenshots: [
            "/assets/projects/mep-design-tool/mep-floor-plan.png",
            "/assets/projects/mep-design-tool/mep-equipment.png",
            "/assets/projects/mep-design-tool/mep-calculations.png",
        ],
        technologies: ["React 19", "Vite", "Konva", "pdfjs-dist", "jsPDF", "Tailwind CSS", "Radix UI", "Fastify", "Prisma"],
        demo: "#",
        source: "#",
        color: "#e84393",
        category: "Engineering Tool",
        featured: true,
    },
];

const projects = [...projectsData].sort((a, b) => {
    const rank = (id) => {
        const i = FEATURED_FIRST_ORDER.indexOf(id);
        return i === -1 ? 1000 + id : i;
    };
    return rank(a.id) - rank(b.id);
});

const CATEGORIES = ["All", "SaaS Platform", "Design Tool", "Engineering Tool", "Other"];

const categoryIcons = {
    "All": Layers,
    "SaaS Platform": Monitor,
    "Design Tool": Wrench,
    "Engineering Tool": Sparkles,
    "Other": Box,
};

// IntersectionObserver hook for scroll animations (callback ref pattern)
function useFadeIn() {
    const observerRef = useRef(null);
    const callbackRef = useCallback((node) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
        );
        observer.observe(node);
        observerRef.current = observer;
    }, []);
    return callbackRef;
}

const ThreeScene = dynamic(() => Promise.resolve(({ }) => {
    const mountRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsClient(typeof window !== 'undefined');
    }, []);

    useEffect(() => {
        if (!isClient || !mountRef.current) return;

        let scene, camera, renderer, animationId;
        let meshes = [];

        const initThree = async () => {
            try {
                const THREE = await import('three');

                scene = new THREE.Scene();
                scene.background = new THREE.Color(0x0a0a0f);

                camera = new THREE.PerspectiveCamera(
                    75,
                    mountRef.current.clientWidth / mountRef.current.clientHeight,
                    0.1,
                    1000
                );
                camera.position.z = 5;

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 1.2;

                if (mountRef.current) {
                    mountRef.current.appendChild(renderer.domElement);
                }

                const ambientLight = new THREE.AmbientLight(0x404080, 1.2);
                scene.add(ambientLight);

                const pointLight1 = new THREE.PointLight(0xffffff, 2, 100);
                pointLight1.position.set(5, 5, 5);
                pointLight1.castShadow = true;
                scene.add(pointLight1);

                const pointLight2 = new THREE.PointLight(0xff6b9d, 1.5, 100);
                pointLight2.position.set(-5, 3, 2);
                scene.add(pointLight2);

                const pointLight3 = new THREE.PointLight(0x6b8cff, 1.5, 100);
                pointLight3.position.set(3, -5, 4);
                scene.add(pointLight3);

                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(10, 10, 5);
                directionalLight.castShadow = true;
                scene.add(directionalLight);

                const geometries = [
                    new THREE.BoxGeometry(1.5, 1.5, 1.5),
                    new THREE.SphereGeometry(1.2, 32, 32),
                    new THREE.ConeGeometry(1.0, 2.0, 8),
                    new THREE.OctahedronGeometry(1.3),
                    new THREE.TorusGeometry(1.0, 0.4, 16, 100),
                    new THREE.RingGeometry(0.8, 1.8, 16, 5),
                    new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16),
                    new THREE.CylinderGeometry(0.5, 1.2, 2.0, 8),
                    new THREE.DodecahedronGeometry(1.2),
                    new THREE.IcosahedronGeometry(1.2),
                    new THREE.TetrahedronGeometry(1.4),
                    new THREE.SphereGeometry(1.5, 16, 16),
                    new THREE.BoxGeometry(1.8, 0.3, 1.8),
                    new THREE.ConeGeometry(0.6, 2.5, 6),
                    new THREE.TorusGeometry(1.2, 0.6, 8, 24),
                    new THREE.CylinderGeometry(0.8, 0.3, 2.2, 12),
                    new THREE.RingGeometry(1.0, 2.0, 24),
                    new THREE.TorusKnotGeometry(1.0, 0.5, 64, 8, 2, 3),
                ];

                const materials = [
                    new THREE.MeshPhongMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.9, shininess: 100, emissive: 0x220000 }),
                    new THREE.MeshPhongMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.9, shininess: 100, emissive: 0x002222 }),
                    new THREE.MeshPhongMaterial({ color: 0x45b7d1, transparent: true, opacity: 0.9, shininess: 100, emissive: 0x001122 }),
                    new THREE.MeshPhongMaterial({ color: 0xfeca57, transparent: true, opacity: 0.9, shininess: 100, emissive: 0x221100 }),
                    new THREE.MeshPhongMaterial({ color: 0xa55eea, transparent: true, opacity: 0.9, shininess: 100, emissive: 0x110022 }),
                    new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.6 }),
                    new THREE.MeshBasicMaterial({ color: 0xff0088, wireframe: true, transparent: true, opacity: 0.6 }),
                    new THREE.MeshBasicMaterial({ color: 0x8800ff, wireframe: true, transparent: true, opacity: 0.6 }),
                    new THREE.MeshStandardMaterial({ color: 0x87ceeb, metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.8, emissive: 0x001122 }),
                    new THREE.MeshStandardMaterial({ color: 0xdda0dd, metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.8, emissive: 0x110011 }),
                ];

                for (let i = 0; i < 40; i++) {
                    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                    const material = materials[Math.floor(Math.random() * materials.length)];
                    const mesh = new THREE.Mesh(geometry, material);

                    mesh.position.set(
                        (Math.random() - 0.5) * 35,
                        (Math.random() - 0.5) * 35,
                        (Math.random() - 0.5) * 35
                    );
                    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                    mesh.scale.setScalar(0.5 + Math.random() * 1.5);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    scene.add(mesh);
                    meshes.push({
                        mesh,
                        rotationSpeed: { x: (Math.random() - 0.5) * 0.03, y: (Math.random() - 0.5) * 0.03, z: (Math.random() - 0.5) * 0.03 },
                        floatSpeed: Math.random() * 0.02 + 0.01,
                        initialY: mesh.position.y,
                    });
                }

                for (let i = 0; i < 5; i++) {
                    const ringGroup = new THREE.Group();
                    for (let j = 0; j < 4; j++) {
                        const ringGeometry = new THREE.RingGeometry(1.2 + j * 0.6, 1.4 + j * 0.6, 32);
                        const ringMaterial = new THREE.MeshBasicMaterial({
                            color: [0xff6b9d, 0x6b8cff, 0x6bff8c, 0xffff6b][j],
                            transparent: true, opacity: 0.5, side: THREE.DoubleSide
                        });
                        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                        ring.rotation.x = j * Math.PI / 4;
                        ringGroup.add(ring);
                    }
                    ringGroup.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40);
                    ringGroup.scale.setScalar(0.8 + Math.random() * 1.2);
                    scene.add(ringGroup);
                    meshes.push({
                        mesh: ringGroup,
                        rotationSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 },
                        floatSpeed: Math.random() * 0.015 + 0.005,
                        initialY: ringGroup.position.y,
                    });
                }

                let mouseX = 0, mouseY = 0;
                const handleMouseMove = (event) => {
                    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                };
                window.addEventListener('mousemove', handleMouseMove);

                const animate = (time) => {
                    animationId = requestAnimationFrame(animate);
                    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
                    camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
                    camera.lookAt(scene.position);
                    meshes.forEach(({ mesh, rotationSpeed, floatSpeed }, index) => {
                        mesh.rotation.x += rotationSpeed.x;
                        mesh.rotation.y += rotationSpeed.y;
                        mesh.rotation.z += rotationSpeed.z;
                        mesh.position.y += Math.sin(time * floatSpeed + index) * 0.01;
                    });
                    renderer.render(scene, camera);
                };
                animate(0);
                setIsLoaded(true);

                const handleResize = () => {
                    if (!mountRef.current) return;
                    camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                };
                window.addEventListener('resize', handleResize);

                return () => {
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('resize', handleResize);
                    if (animationId) cancelAnimationFrame(animationId);
                    if (mountRef.current && renderer?.domElement) {
                        mountRef.current.removeChild(renderer.domElement);
                    }
                    renderer?.dispose();
                };
            } catch (error) {
                setIsLoaded(true);
            }
        };

        const cleanup = initThree();
        return () => { cleanup.then(fn => fn?.()); };
    }, [isClient]);

    return (
        <div ref={mountRef} className="w-full h-full">
            {(!isClient || !isLoaded) && (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 flex items-center justify-center">
                    <div className="text-center">
                        <Box className="animate-spin text-purple-400 mx-auto mb-2" size={32} />
                        <p className="text-gray-400 text-sm">Loading 3D Scene...</p>
                    </div>
                </div>
            )}
        </div>
    );
}), { ssr: false });

const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_70%)]" />
    </div>
);

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { icon: Home, label: 'Home', href: '#hero' },
        { icon: FolderOpen, label: 'Projects', href: '#projects' },
        { icon: Mail, label: 'Contact', href: '#contact' }
    ];

    if (!isMounted) {
        return (
            <header className="fixed top-0 w-full z-50 bg-transparent">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">K.A</div>
                </div>
            </header>
        );
    }

    return (
        <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-5xl`}>
            <div className={`rounded-2xl border transition-all duration-500 ${
                isScrolled
                    ? 'bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl shadow-purple-500/5'
                    : 'bg-white/5 backdrop-blur-md border-white/5'
            }`}>
                <div className="px-6 py-3 flex justify-between items-center">
                    <a href="#hero" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all">
                        K.A
                    </a>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <Icon size={14} />
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <a href="#contact">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:from-purple-500 hover:to-pink-500 rounded-xl text-sm px-5"
                            >
                                Hire Me
                            </Button>
                        </a>
                        <button
                            className="md:hidden text-gray-300 hover:text-white p-1"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
                        {navLinks.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <Icon size={16} />
                                {label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

const HeroSection = () => {
    const fadeRef = useFadeIn();

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Suspense fallback={
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
                }>
                    <ThreeScene />
                </Suspense>
            </div>

            <div ref={fadeRef} className="fade-in-section relative z-10 container mx-auto px-6 py-20">
                <div className="max-w-4xl">
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full text-purple-300 text-sm backdrop-blur-sm">
                            <Sparkles size={14} />
                            Senior Full-Stack Developer · SaaS & Canvas
                        </div>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-[1.1]">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent bg-[length:200%_auto] text-shimmer">
                            Khalid Abbas Jan
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        Senior full-stack engineer building multi-tenant SaaS and interactive{' '}
                        <span className="text-purple-400 font-medium">2D canvas</span> tools — React, Next.js, Node.js,
                        Fabric.js, Konva.js, and{' '}
                        <span className="text-pink-400 font-medium">AWS</span>
                        . Fence-industry platforms, estimating, and design tooling.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-14">
                        <a href="#projects">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-5 text-base rounded-xl group"
                            >
                                View Projects
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </Button>
                        </a>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 text-gray-700 hover:bg-white/10 hover:text-white px-8 py-5 text-base rounded-xl"
                            onClick={() => window.open('https://github.com/Khalid-Abbas-IU', '_blank')}
                        >
                            <Github className="mr-2" size={18} />
                            GitHub Profile
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children is-visible">
                        {[
                            { label: 'Projects Completed', value: '25+', icon: FolderOpen },
                            { label: 'Happy Clients', value: '30+', icon: Users },
                            { label: 'Technologies', value: '15+', icon: Code }
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-purple-500/20 transition-all duration-500 group">
                                <Icon className="mb-3 text-purple-400 group-hover:text-purple-300 transition-colors" size={24} />
                                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                                <div className="text-gray-500 text-sm">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const GitHubSection = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const fadeRef = useFadeIn();

    useEffect(() => { setIsMounted(true); }, []);

    const githubStats = [
        { label: 'Repositories', value: '25+', icon: GitBranch },
        { label: 'Contributions', value: '500+', icon: Code },
        { label: 'Stars Earned', value: '50+', icon: Star },
        { label: 'Followers', value: '15+', icon: Users }
    ];

    if (!isMounted) {
        return (
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            GitHub Activity
                        </h2>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={fadeRef} className="fade-in-section py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-300 text-sm backdrop-blur-sm mb-6">
                        <Github size={14} />
                        Open Source Contributions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                        GitHub Activity
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Consistent coding habits and active contribution to the developer community
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                    {githubStats.map(({ label, value, icon: Icon }) => (
                        <Card key={label} className="bg-white/[0.03] backdrop-blur-sm border-white/[0.06] hover:border-green-500/30 transition-all duration-500 group">
                            <CardContent className="p-5 text-center">
                                <Icon className="mx-auto mb-2 text-green-400 group-hover:scale-110 transition-transform duration-300" size={20} />
                                <div className="text-xl font-bold text-white mb-0.5">{value}</div>
                                <div className="text-gray-500 text-xs">{label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="bg-white/[0.03] backdrop-blur-sm border-white/[0.06] hover:border-green-500/20 transition-all duration-500 overflow-hidden group">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-center text-white group-hover:text-green-400 transition-colors flex items-center justify-center gap-2 text-lg">
                            <Github size={20} />
                            Contribution Graph
                        </CardTitle>
                        <CardDescription className="text-center text-gray-500 text-sm">
                            Daily coding activity over the past year
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                        <div className="relative rounded-xl overflow-hidden">
                            {!isImageLoaded && (
                                <div className="w-full h-40 bg-gradient-to-r from-green-900/10 to-blue-900/10 animate-pulse rounded-xl flex items-center justify-center">
                                    <Github className="text-green-400/50 animate-spin" size={28} />
                                </div>
                            )}
                            <img
                                src="/assets/images/github-contribution-chart.png"
                                alt="GitHub Contribution Chart"
                                className={`w-full rounded-xl transition-all duration-700 hover:scale-[1.02] border border-white/[0.06] ${
                                    isImageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                }`}
                                onLoad={() => setIsImageLoaded(true)}
                                onError={(e) => { e.target.style.display = 'none'; setIsImageLoaded(true); }}
                            />
                        </div>
                        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-green-500/30 text-green-400 hover:bg-green-500/10 rounded-xl"
                                onClick={() => window.open('https://github.com/Khalid-Abbas-IU', '_blank')}
                            >
                                <Github className="mr-2" size={16} />
                                View GitHub Profile
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white/5 text-gray-300 hover:bg-white/10 rounded-xl"
                                onClick={() => window.open('https://github.com/Khalid-Abbas-IU?tab=repositories', '_blank')}
                            >
                                <GitBranch className="mr-2" size={16} />
                                Browse Repositories
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/[0.03] backdrop-blur-sm border-white/[0.06] hover:border-purple-500/20 transition-all duration-500 group">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-white group-hover:text-purple-400 transition-colors flex items-center gap-2 text-base">
                                <Code size={18} />
                                Coding Languages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { name: 'JavaScript', percentage: 85, color: '#f7df1e' },
                                    { name: 'TypeScript', percentage: 75, color: '#3178c6' },
                                    { name: 'React/Next.js', percentage: 90, color: '#61dafb' },
                                    { name: 'Node.js', percentage: 80, color: '#339933' },
                                    { name: 'Python', percentage: 60, color: '#3776ab' }
                                ].map(({ name, percentage, color }) => (
                                    <div key={name}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-400 text-sm">{name}</span>
                                            <span className="text-gray-500 text-xs">{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5">
                                            <div
                                                className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${percentage}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}30` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/[0.03] backdrop-blur-sm border-white/[0.06] hover:border-blue-500/20 transition-all duration-500 group">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-white group-hover:text-blue-400 transition-colors flex items-center gap-2 text-base">
                                <Star size={18} />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2.5">
                                {[
                                    { action: 'Pushed to', repo: 'pdf-stamper-tool', time: '2 hours ago', type: 'commit' },
                                    { action: 'Created', repo: 'dimensions-app', time: '1 day ago', type: 'repo' },
                                    { action: 'Updated', repo: 'logoflow-app', time: '3 days ago', type: 'commit' },
                                    { action: 'Released', repo: 'weld-map-app', time: '1 week ago', type: 'release' }
                                ].map(({ action, repo, time, type }, index) => (
                                    <div key={index} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                            type === 'commit' ? 'bg-green-400' : type === 'repo' ? 'bg-blue-400' : 'bg-purple-400'
                                        }`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-400 text-sm truncate">
                                                {action} <span className="text-blue-400 font-medium">{repo}</span>
                                            </p>
                                            <p className="text-gray-600 text-xs">{time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const fadeRef = useFadeIn();

    useEffect(() => { setIsMounted(true); }, []);

    const openProjectModal = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const closeProjectModal = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedProject?.screenshots?.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProject.screenshots.length);
        }
    };

    const prevImage = () => {
        if (selectedProject?.screenshots?.length > 0) {
            setCurrentImageIndex((prev) => prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1);
        }
    };

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    if (!isMounted) {
        return (
            <section id="projects" className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Featured Projects
                        </h2>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 relative">
            <div ref={fadeRef} className="fade-in-section container mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full text-purple-300 text-sm backdrop-blur-sm mb-6">
                        <FolderOpen size={14} />
                        Portfolio
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                        Featured Projects
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto mb-8">
                        Editors, designers, platforms, and engineering tools I've built for clients and personal projects
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => {
                            const Icon = categoryIcons[cat];
                            const count = cat === "All" ? projects.length : projects.filter(p => p.category === cat).length;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                                        activeCategory === cat
                                            ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                                            : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300'
                                    }`}
                                >
                                    <Icon size={14} />
                                    {cat}
                                    <span className="text-xs opacity-60">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            className="bg-white/[0.03] backdrop-blur-sm border-white/[0.06] hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/5 group cursor-pointer relative overflow-hidden"
                            style={{ '--project-color': project.color }}
                            onClick={() => openProjectModal(project)}
                        >
                            {project.featured && (
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-semibold uppercase tracking-wider">
                                        <Award size={10} />
                                        Featured
                                    </span>
                                </div>
                            )}

                            <CardHeader className="pb-3">
                                <div
                                    className="w-full h-44 rounded-xl mb-3 relative overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${project.color}10, ${project.color}25)`,
                                        border: `1px solid ${project.color}15`
                                    }}
                                >
                                    {project.screenshots?.length > 0 ? (
                                        <img
                                            src={project.screenshots[0]}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                            <div
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
                                                style={{ backgroundColor: `${project.color}30`, border: `1px solid ${project.color}40` }}
                                            >
                                                <Layers size={28} style={{ color: project.color }} />
                                            </div>
                                            <span className="text-gray-600 text-xs">Client Project</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-white group-hover:text-purple-300 transition-colors text-base leading-snug">
                                        {project.title}
                                    </CardTitle>
                                    <span className="flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-medium border"
                                        style={{
                                            color: project.color,
                                            borderColor: `${project.color}30`,
                                            backgroundColor: `${project.color}10`
                                        }}
                                    >
                                        {project.category}
                                    </span>
                                </div>
                                <CardDescription className="text-gray-500 text-sm line-clamp-2 mt-1">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pb-3">
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.slice(0, 5).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 bg-white/[0.04] rounded-md text-[11px] text-gray-400 border border-white/[0.06]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 5 && (
                                        <span className="px-2 py-0.5 text-[11px] text-gray-500">
                                            +{project.technologies.length - 5}
                                        </span>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="flex gap-2 pt-0">
                                {project.demo && project.demo !== '#' && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 border-purple-500/20 text-purple-400 hover:bg-purple-500/10 rounded-xl text-xs h-8"
                                        onClick={(e) => { e.stopPropagation(); window.open(project.demo, '_blank'); }}
                                    >
                                        <ExternalLink className="mr-1.5" size={12} />
                                        Live Demo
                                    </Button>
                                )}
                                {project.source && project.source !== '#' && (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="flex-1 bg-white/5 text-gray-300 hover:bg-white/10 rounded-xl text-xs h-8"
                                        onClick={(e) => { e.stopPropagation(); window.open(project.source, '_blank'); }}
                                    >
                                        <Github className="mr-1.5" size={12} />
                                        Code
                                    </Button>
                                )}
                                {(!project.demo || project.demo === '#') && (!project.source || project.source === '#') && (
                                    <div className="flex-1 text-center text-gray-600 text-xs py-1">Private / Client Project</div>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {selectedProject && (
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={closeProjectModal}
                    >
                        <div
                            className="modal-enter bg-gray-950/95 backdrop-blur-xl rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold text-white truncate">{selectedProject.title}</h3>
                                            {selectedProject.featured && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-semibold uppercase flex-shrink-0">
                                                    <Award size={10} />
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.description}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={closeProjectModal}
                                        className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl ml-4 flex-shrink-0"
                                    >
                                        <X size={18} />
                                    </Button>
                                </div>

                                {selectedProject.video && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
                                            <Play size={14} />
                                            Video Demo
                                        </h4>
                                        <video
                                            className="w-full rounded-xl border border-white/10"
                                            controls
                                            src={selectedProject.video}
                                        />
                                    </div>
                                )}

                                {selectedProject.screenshots?.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Screenshots</h4>
                                        <div className="relative rounded-xl overflow-hidden bg-black/50">
                                            <img
                                                src={selectedProject.screenshots[currentImageIndex]}
                                                alt={`${selectedProject.title} Screenshot ${currentImageIndex + 1}`}
                                                className="w-full rounded-xl border border-white/10"
                                            />

                                            {selectedProject.screenshots.length > 1 && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black/80 rounded-xl h-10 w-10 p-0"
                                                        onClick={prevImage}
                                                    >
                                                        <ChevronLeft size={18} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black/80 rounded-xl h-10 w-10 p-0"
                                                        onClick={nextImage}
                                                    >
                                                        <ChevronRight size={18} />
                                                    </Button>
                                                    <div className="flex justify-center mt-3 gap-1.5">
                                                        {selectedProject.screenshots.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                                    index === currentImageIndex ? 'bg-purple-400 w-6' : 'bg-white/20 hover:bg-white/40'
                                                                }`}
                                                                onClick={() => setCurrentImageIndex(index)}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 bg-white/[0.04] rounded-lg text-sm text-gray-300 border border-white/[0.08]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {selectedProject.demo && selectedProject.demo !== '#' && (
                                        <Button
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl"
                                            onClick={() => window.open(selectedProject.demo, '_blank')}
                                        >
                                            <ExternalLink className="mr-2" size={16} />
                                            View Live Demo
                                        </Button>
                                    )}
                                    {selectedProject.source && selectedProject.source !== '#' && (
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-white/20 text-gray-300 hover:bg-white/10 rounded-xl"
                                            onClick={() => window.open(selectedProject.source, '_blank')}
                                        >
                                            <Github className="mr-2" size={16} />
                                            View Source Code
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const ContactSection = () => {
    const fadeRef = useFadeIn();

    return (
        <section id="contact" ref={fadeRef} className="fade-in-section py-20 relative">
            <div className="container mx-auto px-6 text-center">
                <Card className="bg-white/[0.03] backdrop-blur-sm border-white/[0.06] max-w-2xl mx-auto animate-border-glow rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                            Ready to Work Together?
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-lg">
                            Let's create something amazing with cutting-edge web technologies
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 rounded-xl"
                                onClick={() => window.open('https://www.upwork.com/freelancers/~01e48daa9d2ab5861a', '_blank')}
                            >
                                Hire on Upwork
                            </Button>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 rounded-xl"
                                onClick={() => window.open('https://www.fiverr.com/khalid_abbasiu', '_blank')}
                            >
                                View Fiverr Gigs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default function AdvancedPortfolio() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Box className="animate-spin text-purple-400 mx-auto mb-4" size={48} />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Loading Portfolio
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Initializing 3D experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <AnimatedBackground />
            <Header />
            <HeroSection />
            <GitHubSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
}
