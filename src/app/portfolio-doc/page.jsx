"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Download, ArrowLeft, X, Image as ImageIcon, Loader2 } from "lucide-react";

const portfolioProjects = [
    {
        id: 13,
        title: "Dirtface.com — Fence Industry SaaS Platform",
        category: "SaaS Platform",
        role: "Lead Software Engineer — Full-Stack Architecture & Team Lead",
        description: "A full B2B SaaS platform for fence contractors. Built the entire system from scratch — covering estimating, quoting, CRM, job management, crew scheduling, invoicing with Stripe + QuickBooks sync, inventory management, shop drawings library, customer portal with document signing, and a wholesale B2B storefront. Multi-tenant architecture with role-based access and Stripe subscription billing.",
        tech: ["Next.js 14", "React", "Redux", "Node.js", "Express", "MongoDB", "Fabric.js", "AWS", "Stripe", "Tailwind CSS"],
        features: [
            "Multi-tenant architecture with tenant subdomains and RBAC",
            "Visual fence designer on canvas, maps, and blueprints using Fabric.js",
            "Stripe subscription billing and QuickBooks accounting sync",
            "Customer portal with proposal viewing and document signing",
            "15+ Playwright E2E test suites and comprehensive Jest coverage",
        ],
        defaultImages: [
            "/assets/projects/dirtface-platform/dirtface-dashboard.png",
            "/assets/projects/dirtface-platform/dirtface-fence-designer.png",
            "/assets/projects/dirtface-platform/dirtface-crm.png",
        ],
        section: "featured",
    },
    {
        id: 19,
        title: "Fence Designer Tool",
        category: "Design Tool",
        role: "Lead Developer — Canvas & Mapping Integration",
        description: "A Fabric.js canvas-based fence layout designer embedded within the Dirtface quoting workflow. Supports blueprint upload, Google Maps satellite view integration, drawing fence sections with posts and gates, automatic material takeoffs, and measurement annotations — all tied to the estimate for instant pricing.",
        tech: ["React", "Fabric.js", "Google Maps API", "Canvas API", "Tailwind CSS"],
        features: [
            "Blueprint upload with scale calibration",
            "Google Maps satellite view toggle for real-world context",
            "Automatic material takeoffs with measurement annotations",
            "Real-time pricing updates tied to the estimate",
            "PDF export of fence layouts with dimensions",
        ],
        defaultImages: [
            "/assets/projects/fence-designer/fence-designer-canvas.png",
            "/assets/projects/fence-designer/fence-designer-gate.png",
        ],
        section: "featured",
    },
    {
        id: 12,
        title: "Dirtface Shop Drawing Designer",
        category: "Design Tool",
        role: "Lead Developer — Canvas Architecture & Performance",
        description: "A high-performance, embeddable shop drawing designer (React + Konva) for creating professional technical drawings. Features a multi-layer canvas architecture with grid, blueprint, structure, dimensions, and annotations layers. Supports template/model workflows, boolean geometry operations via Paper.js, and produces vector PDF output via svg2pdf.js.",
        tech: ["React", "Konva.js", "Paper.js", "svg2pdf.js", "Tailwind CSS", "Radix UI"],
        features: [
            "Multi-layer canvas architecture (grid, blueprint, structure, dimensions, annotations)",
            "Boolean geometry operations via Paper.js",
            "Vector PDF output pipeline via svg2pdf.js",
            "Iframe-embedded with strict postMessage communication protocol",
            "Optimized rendering for 3,000–5,000 objects",
        ],
        defaultImages: [
            "/assets/projects/shop-drawing-designer/shop-drawing-editor.png",
            "/assets/projects/shop-drawing-designer/shop-drawing-export.png",
            "/assets/projects/shop-drawing-designer/shop-drawing-templates.png",
        ],
        section: "featured",
    },
    {
        id: 20,
        title: "MEP Design Tool",
        category: "Engineering Tool",
        role: "Full-Stack Developer — Architecture & Canvas",
        description: "A browser-based MEP/heating layout editor for engineers. Import PDF floor plans, calibrate real-world scale, trace rooms and walls, lay out hydronic piping and equipment, run heating calculations (heat loss, flow rates, pipe sizing, pressure drop), and export professional PDF/PNG drawings with title blocks.",
        tech: ["React 19", "Vite", "Konva.js", "pdfjs-dist", "jsPDF", "Fastify", "Prisma", "Tailwind CSS"],
        features: [
            "PDF floor plan import with real-world scale calibration",
            "Heating calculations: heat loss, flow rates, pipe sizing, pressure drop",
            "Multi-layer Konva canvas architecture",
            "Equipment drag-and-drop placement (radiators, boilers, ASHP)",
            "Professional PDF/PNG export with title blocks",
        ],
        defaultImages: [
            "/assets/projects/mep-design-tool/mep-floor-plan.png",
            "/assets/projects/mep-design-tool/mep-equipment.png",
            "/assets/projects/mep-design-tool/mep-calculations.png",
        ],
        section: "featured",
    },
    {
        id: 1,
        title: "PDF Stamper Tool",
        category: "Design Tool",
        role: "Full-Stack Developer — PDF Processing & Canvas",
        description: "A PDF stamping tool for welding inspection workflows. Users upload PDFs and apply watermarks, timestamps, text annotations, and custom stamps to any page. Supports multi-page documents, adjustable positioning and opacity, batch processing, and export to PDF/PNG.",
        tech: ["Next.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "Multi-page PDF upload and processing",
            "Watermarks, timestamps, and custom stamp placement",
            "Adjustable positioning, opacity, and batch processing",
            "Export to PDF and PNG formats",
        ],
        defaultImages: [
            "/assets/projects/pdf-stamper/pdf-stamper-1.png",
            "/assets/projects/pdf-stamper/pdf-stamper-2.png",
            "/assets/projects/pdf-stamper/pdf-stamper-3.png",
        ],
        section: "tools",
    },
    {
        id: 2,
        title: "Dimensions App",
        category: "Design Tool",
        role: "Full-Stack Developer",
        description: "An advanced measurement and annotation application for inspection workflows. Enables accurate dimensioning, annotation, and visualization tailored for professionals in construction and engineering fields.",
        tech: ["Next.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "Precision measurement and annotation tools",
            "Interactive canvas-based visualization",
            "Professional inspection workflow integration",
        ],
        defaultImages: [
            "/assets/projects/dimensions-app/img.png",
            "/assets/projects/dimensions-app/img_1.png",
        ],
        section: "tools",
    },
    {
        id: 3,
        title: "Logoflow App",
        category: "Design Tool",
        role: "Lead Developer — Full-Stack & Canvas",
        description: "An AI-powered logo designer with drag-and-drop Fabric.js canvas editing, asset library management, text styling, color palettes, and multi-format export. Users design logos from templates or AI suggestions, customize on canvas, and download in SVG/PNG/PDF.",
        tech: ["React", "Next.js", "Fabric.js", "Node.js", "AWS S3", "Tailwind CSS"],
        features: [
            "AI-powered template suggestions",
            "Drag-and-drop Fabric.js canvas with full editing controls",
            "Asset library with search and categorization",
            "Multi-format export (SVG, PNG, PDF)",
            "Backend asset storage on AWS S3",
        ],
        defaultImages: [
            "/assets/projects/logoflow/img.png",
            "/assets/projects/logoflow/img_1.png",
        ],
        section: "tools",
    },
    {
        id: 4,
        title: "DFD Designer Tool",
        category: "Design Tool",
        role: "Full-Stack Developer",
        description: "A tool for designing and analyzing Data Flow Diagrams (DFDs). Supports creating process nodes, data stores, external entities, and data flows with an interactive canvas interface.",
        tech: ["Next.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "Interactive canvas for DFD creation",
            "Process nodes, data stores, and entity management",
            "Data flow connections and annotations",
            "Export and documentation features",
        ],
        defaultImages: [
            "/assets/projects/dfd-designer-tool/img.png",
            "/assets/projects/dfd-designer-tool/img_1.png",
        ],
        section: "tools",
    },
    {
        id: 5,
        title: "Weld Map App",
        category: "Design Tool",
        role: "Full-Stack Developer — Canvas & Data Visualization",
        description: "A weld mapping documentation tool for construction and inspection professionals. Users annotate blueprints with weld locations, track weld types and statuses, visualize welding processes, and generate professional PDF reports.",
        tech: ["Next.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "Interactive canvas-based weld annotation",
            "Weld data management with type and status tracking",
            "Process visualization and filtering",
            "Professional PDF report generation",
        ],
        defaultImages: [
            "/assets/projects/weld-map/weld-map-1.png",
            "/assets/projects/weld-map/weld-map-2.png",
        ],
        section: "tools",
    },
    {
        id: 6,
        title: "Map Plan Marker",
        category: "Design Tool",
        role: "Full-Stack Developer",
        description: "A marking and annotation tool for construction and welding plans. Enables efficient documentation of plan markups with interactive positioning, notes, and status tracking.",
        tech: ["Next.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "Interactive plan marking and annotation",
            "Position-based notes and status tracking",
            "Construction and welding workflow support",
        ],
        defaultImages: [
            "/assets/projects/map-marker/img.png",
            "/assets/projects/map-marker/img_1.png",
        ],
        section: "tools",
    },
    {
        id: 7,
        title: "Football Easy Coach",
        category: "Design Tool",
        role: "Full-Stack Developer",
        description: "A real-time football tactics board with animated formations. Coaches create and execute strategies with drag-and-drop player positioning, formation templates, and animated play sequences.",
        tech: ["React", "Fabric.js", "WebSockets", "Node.js", "Tailwind CSS"],
        features: [
            "Drag-and-drop player positioning on pitch canvas",
            "Animated play sequences and formation templates",
            "Real-time collaboration via WebSockets",
            "Shareable tactical diagrams and export",
        ],
        defaultImages: [
            "/assets/projects/football-easy-coach/img.png",
        ],
        section: "tools",
    },
    {
        id: 8,
        title: "Build Studio",
        category: "Design Tool",
        role: "Full-Stack Developer",
        description: "A studio environment setup application with canvas-based layout configuration and design tools for in-house production operations.",
        tech: ["Next.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "Canvas-based studio layout configuration",
            "Design tool integration for production workflows",
            "Responsive interface for desktop and tablet",
        ],
        defaultImages: [
            "/assets/projects/build-studio/img.png",
            "/assets/projects/build-studio/img_1.png",
        ],
        section: "tools",
    },
    {
        id: 9,
        title: "T-Shirt Designer",
        category: "Design Tool",
        role: "Full-Stack Developer",
        description: "An interactive T-shirt design application with real-time preview and customization options. Users place text, images, and graphics on garment templates with print-area mapping.",
        tech: ["React", "Fabric.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "Real-time garment preview with print-area mapping",
            "Text, image, and graphic placement on canvas",
            "Multiple garment template support",
            "High-resolution export for production",
        ],
        defaultImages: [
            "/assets/projects/t-shirt-designer/img.png",
            "/assets/projects/t-shirt-designer/img_1.png",
        ],
        section: "tools",
    },
    {
        id: 10,
        title: "Generate Image",
        category: "Design Tool",
        role: "Full-Stack Developer",
        description: "An image generation and customization tool that creates visuals based on user inputs, streamlining workflows for graphic and visual design professionals.",
        tech: ["Next.js", "Node.js", "Canvas API", "Tailwind CSS"],
        features: [
            "User-input-driven image generation",
            "Customization controls for output styling",
            "Multi-format export for design workflows",
        ],
        defaultImages: [
            "/assets/projects/generate-image/img.png",
            "/assets/projects/generate-image/img_1.png",
        ],
        section: "tools",
    },
    {
        id: 11,
        title: "Glorify Template Designer",
        category: "Design Tool",
        role: "Frontend Developer — Canvas Editor (Client: app.glorify.com)",
        description: "Built the core template designer for app.glorify.com — a drag-and-drop editor enabling users to create and customize marketing templates with an intuitive canvas interface and export workflows.",
        tech: ["React", "Next.js", "Fabric.js", "Canvas API", "Node.js", "Tailwind CSS"],
        features: [
            "Drag-and-drop template editing with Fabric.js",
            "Layering, text/image manipulation, and filters",
            "Template library management system",
            "Multi-format export workflows",
        ],
        section: "client",
    },
    {
        id: 14,
        title: "Easy Coach Club Editor",
        category: "Design Tool",
        role: "Frontend Developer — Core Editor Experience",
        description: "Custom editor for Easy Coach Club — built the core editor experience for coaches to create and manage content and strategies on the platform with canvas-based tools.",
        tech: ["React", "Next.js", "Canvas API", "Node.js", "Tailwind CSS"],
        features: [
            "Canvas-based strategy creation tools",
            "Content management for coaches",
            "Interactive editing experience",
        ],
        section: "client",
    },
    {
        id: 15,
        title: "AI Canvas Studio",
        category: "Design Tool",
        role: "Full-Stack Developer — Canvas & AI Integration",
        description: "AI-powered canvas studio for creative workflows — combines canvas-based design with AI generation and editing capabilities for images and layouts.",
        tech: ["React", "Next.js", "Canvas API", "AI/ML APIs", "Node.js", "Tailwind CSS"],
        features: [
            "Canvas-based design with AI-powered generation",
            "Image and layout editing with AI assistance",
            "Creative workflow automation",
        ],
        section: "client",
    },
    {
        id: 16,
        title: "Shirt Designers (Multiple Clients)",
        category: "Design Tool",
        role: "Full-Stack Developer — Product Customizer",
        description: "Custom shirt designer applications for multiple clients — interactive editors with real-time preview, print-area mapping, and order integration for e-commerce platforms.",
        tech: ["React", "Next.js", "Fabric.js", "Canvas API", "Node.js", "Tailwind CSS"],
        features: [
            "Interactive real-time garment preview",
            "Print-area mapping with precise positioning",
            "E-commerce order integration",
        ],
        section: "client",
    },
    {
        id: 17,
        title: "Template Designers (Multiple Clients)",
        category: "Design Tool",
        role: "Full-Stack Developer — Template Editor",
        description: "Template design tools for various clients — drag-and-drop editors for social media posts, marketing assets, and branded templates with multi-format export options.",
        tech: ["React", "Next.js", "Fabric.js", "Canvas API", "Node.js", "Tailwind CSS"],
        features: [
            "Drag-and-drop template editing",
            "Social media and marketing asset creation",
            "Brand-consistent template management",
            "Multi-format export (PNG, PDF, SVG)",
        ],
        section: "client",
    },
    {
        id: 18,
        title: "Le Faire Part Ethique — Product Customizer",
        category: "Other",
        role: "Full-Stack Developer — E-Commerce Integration",
        description: "WooCommerce product customizer for Le Faire Part Ethique — an in-product editor for personalized invitations and print products with admin controls. Integrated into the existing WordPress/WooCommerce storefront.",
        tech: ["React", "WordPress", "WooCommerce", "REST API", "Canvas API", "Tailwind CSS"],
        features: [
            "In-product customization editor for invitations",
            "WooCommerce and WordPress integration",
            "Admin controls for template management",
            "Print-ready output generation",
        ],
        section: "client",
    },
];

const categoryColors = {
    "SaaS Platform": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Design Tool": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Engineering Tool": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Other": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

function ProjectCard({ project, images, onImageUpload, onImageRemove, onDefaultImageRemove, hiddenDefaults }) {
    const fileInputRef = useRef(null);
    const defaultImages = (project.defaultImages || []).filter((_, i) => !hiddenDefaults.includes(i));

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                onImageUpload(project.id, ev.target.result);
            };
            reader.readAsDataURL(file);
        });
        e.target.value = "";
    };

    const allImages = [
        ...defaultImages.map((src, i) => ({ src, type: "default", originalIndex: (project.defaultImages || []).indexOf(src) })),
        ...images.map((src, i) => ({ src, type: "uploaded", index: i })),
    ];

    return (
        <div className="portfolio-project mb-8 break-inside-avoid">
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <span className={`cat-tag text-xs px-3 py-1 rounded-full border whitespace-nowrap ${categoryColors[project.category] || categoryColors["Other"]}`}>
                        {project.category}
                    </span>
                </div>

                <p className="text-sm text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                        <span key={t} className="tech-tag text-xs px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
                            {t}
                        </span>
                    ))}
                </div>

                <ul className="text-sm text-gray-400 space-y-1.5 mb-4 list-none">
                    {project.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="feature-bullet text-purple-400 mt-1 shrink-0">&#8250;</span>
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    {allImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            {allImages.map((img, i) => (
                                <div key={`${img.type}-${i}`} className="relative group rounded-lg overflow-hidden border border-white/10">
                                    <img src={img.src} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-40 object-cover" />
                                    <button
                                        onClick={() => img.type === "default"
                                            ? onDefaultImageRemove(project.id, img.originalIndex)
                                            : onImageRemove(project.id, img.index)
                                        }
                                        className="no-print absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="no-print w-full border-2 border-dashed border-white/10 hover:border-purple-500/40 rounded-lg py-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-purple-400 transition-colors"
                    >
                        <Upload size={16} />
                        Upload Screenshots
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    );
}

export default function PortfolioDocPage() {
    const [projectImages, setProjectImages] = useState({});
    const [hiddenDefaultImages, setHiddenDefaultImages] = useState({});
    const contentRef = useRef(null);

    const handleImageUpload = useCallback((projectId, dataUrl) => {
        setProjectImages((prev) => ({
            ...prev,
            [projectId]: [...(prev[projectId] || []), dataUrl],
        }));
    }, []);

    const handleImageRemove = useCallback((projectId, index) => {
        setProjectImages((prev) => ({
            ...prev,
            [projectId]: (prev[projectId] || []).filter((_, i) => i !== index),
        }));
    }, []);

    const handleDefaultImageRemove = useCallback((projectId, originalIndex) => {
        setHiddenDefaultImages((prev) => ({
            ...prev,
            [projectId]: [...(prev[projectId] || []), originalIndex],
        }));
    }, []);

    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPDF = async () => {
        if (isGenerating) return;
        setIsGenerating(true);

        try {
            const html2canvas = (await import("html2canvas-pro")).default;
            const { jsPDF } = await import("jspdf");

            const element = contentRef.current;
            if (!element) return;

            const buttons = element.querySelectorAll(".no-print");
            buttons.forEach((btn) => (btn.style.display = "none"));

            element.classList.add("pdf-mode");

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff",
                logging: false,
            });

            element.classList.remove("pdf-mode");
            buttons.forEach((btn) => (btn.style.display = ""));

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL("image/jpeg", 0.92);

            const pdf = new jsPDF("p", "mm", "a4");
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = -(imgHeight - heightLeft);
                pdf.addPage();
                pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("Khalid_Abbas_Portfolio.pdf");
        } catch (err) {
            console.error("PDF generation failed:", err);
            window.print();
        } finally {
            setIsGenerating(false);
        }
    };

    const featured = portfolioProjects.filter((p) => p.section === "featured");
    const tools = portfolioProjects.filter((p) => p.section === "tools");
    const client = portfolioProjects.filter((p) => p.section === "client");

    return (
        <>
            <style jsx global>{`
                .pdf-mode,
                .pdf-mode .portfolio-header,
                .pdf-mode .portfolio-project > div {
                    background: #ffffff !important;
                    color: #1a1a1a !important;
                }
                .pdf-mode .portfolio-header {
                    border-color: #e2e8f0 !important;
                }
                .pdf-mode .portfolio-project > div {
                    border-color: #e2e8f0 !important;
                }
                .pdf-mode .pdf-name {
                    background: none !important;
                    -webkit-background-clip: unset !important;
                    background-clip: unset !important;
                    -webkit-text-fill-color: unset !important;
                    color: #7c3aed !important;
                }
                .pdf-mode h3 { color: #111827 !important; }
                .pdf-mode p,
                .pdf-mode li span { color: #374151 !important; }
                .pdf-mode .stat-num { color: #7c3aed !important; }
                .pdf-mode .section-heading {
                    color: #7c3aed !important;
                    border-color: #7c3aed !important;
                }
                .pdf-mode .cat-tag {
                    background: #f3f4f6 !important;
                    color: #6b7280 !important;
                    border-color: #e5e7eb !important;
                }
                .pdf-mode .tech-tag {
                    background: #f3f4f6 !important;
                    color: #4b5563 !important;
                    border-color: #e5e7eb !important;
                }
                .pdf-mode .feature-bullet { color: #7c3aed !important; }
                .pdf-mode .footer-section {
                    border-color: #7c3aed !important;
                }
                .pdf-mode .footer-section p,
                .pdf-mode .footer-section a { color: #374151 !important; }
                .pdf-mode .footer-section a { color: #7c3aed !important; }
                .pdf-mode .subtitle-text { color: #6b7280 !important; }
                .pdf-mode .contact-text { color: #9ca3af !important; }
                .pdf-mode .contact-text a { color: #7c3aed !important; }
                .pdf-mode .stat-label { color: #9ca3af !important; }
                .pdf-mode .summary-text { color: #374151 !important; }
                .pdf-mode .role-text { color: #6b7280 !important; }

                @media print {
                    body { background: white !important; color: black !important; }
                    .no-print { display: none !important; }
                    .portfolio-project { break-inside: avoid; page-break-inside: avoid; }
                }
            `}</style>

            <div className="min-h-screen bg-black text-white">
                {/* Top bar */}
                <div className="no-print sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
                    <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
                        <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft size={16} />
                            Back to Portfolio
                        </a>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGenerating}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                            {isGenerating ? "Generating PDF..." : "Download PDF"}
                        </button>
                    </div>
                </div>

                <div ref={contentRef} className="max-w-4xl mx-auto px-6 py-10">
                    {/* Header */}
                    <div className="portfolio-header border border-white/10 rounded-2xl p-8 mb-10 bg-white/[0.02]">
                        <h1 className="pdf-name text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                            Khalid Abbas
                        </h1>
                        <p className="subtitle-text text-gray-400 mb-1">Senior Full-Stack Developer &middot; SaaS Architect &middot; Canvas/2D Design Tools Expert</p>
                        <p className="contact-text text-sm text-gray-500 mb-6">
                            {/* Lahore, Pakistan &nbsp;|&nbsp; khalid.abbas.iu@gmail.com &nbsp;|&nbsp; (+92) 0314-8880956
                            <br /> */}
                            <a href="https://my-portfolio-six-tawny-89.vercel.app" className="text-purple-400 hover:text-purple-300">Portfolio</a>
                            &nbsp;&middot;&nbsp;
                            <a href="https://github.com/Khalid-Abbas-IU" className="text-purple-400 hover:text-purple-300">GitHub</a>
                            &nbsp;&middot;&nbsp;
                            <a href="https://www.linkedin.com/in/khalid-abbas-869831193" className="text-purple-400 hover:text-purple-300">LinkedIn</a>
                            &nbsp;&middot;&nbsp;
                            <a href="https://www.upwork.com/freelancers/khalidabbas" className="text-purple-400 hover:text-purple-300">Upwork</a>
                        </p>

                        <p className="summary-text text-sm text-gray-300 leading-relaxed mb-6">
                            Lead Software Engineer with 5+ years and 20+ shipped products — specializing in multi-tenant SaaS platforms
                            and interactive 2D canvas/design tools (Fabric.js, Konva.js). Currently leading the full software team at
                            DirtFace Inc. (Canada), building a cloud-powered platform for the fence contracting industry from scratch.
                        </p>

                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { num: "20+", label: "Projects Shipped" },
                                { num: "5+", label: "Years Experience" },
                                { num: "30+", label: "Happy Clients" },
                                { num: "15+", label: "Technologies" },
                            ].map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className="stat-num text-xl font-bold text-purple-400">{s.num}</div>
                                    <div className="stat-label text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Projects */}
                    <h2 className="section-heading text-xl font-bold text-purple-400 border-b border-purple-500/30 pb-2 mb-6">
                        Featured Projects
                    </h2>
                    {featured.map((p) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            images={projectImages[p.id] || []}
                            hiddenDefaults={hiddenDefaultImages[p.id] || []}
                            onImageUpload={handleImageUpload}
                            onImageRemove={handleImageRemove}
                            onDefaultImageRemove={handleDefaultImageRemove}
                        />
                    ))}

                    {/* Canvas & Design Tools */}
                    <h2 className="section-heading text-xl font-bold text-purple-400 border-b border-purple-500/30 pb-2 mb-6 mt-10">
                        Canvas &amp; Design Tools
                    </h2>
                    {tools.map((p) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            images={projectImages[p.id] || []}
                            hiddenDefaults={hiddenDefaultImages[p.id] || []}
                            onImageUpload={handleImageUpload}
                            onImageRemove={handleImageRemove}
                            onDefaultImageRemove={handleDefaultImageRemove}
                        />
                    ))}

                    {/* Client Projects */}
                    <h2 className="section-heading text-xl font-bold text-purple-400 border-b border-purple-500/30 pb-2 mb-6 mt-10">
                        Client Projects
                    </h2>
                    {client.map((p) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            images={projectImages[p.id] || []}
                            hiddenDefaults={hiddenDefaultImages[p.id] || []}
                            onImageUpload={handleImageUpload}
                            onImageRemove={handleImageRemove}
                            onDefaultImageRemove={handleDefaultImageRemove}
                        />
                    ))}

                    {/* Footer */}
                    <div className="footer-section mt-12 pt-6 border-t border-purple-500/30 text-center text-sm text-gray-500">
                        <p className="font-semibold text-white mb-1">Khalid Abbas</p>
                        <p>Senior Full-Stack Developer &middot; SaaS &amp; Canvas Expert</p>
                        <p className="mt-2">
                            {/* <a href="mailto:khalid.abbas.iu@gmail.com" className="text-purple-400">khalid.abbas.iu@gmail.com</a>
                            &nbsp;&middot;&nbsp; (+92) 0314-8880956
                        </p>
                        <p className="mt-1"> */}
                            <a href="https://my-portfolio-six-tawny-89.vercel.app" className="text-purple-400">Portfolio</a>
                            &nbsp;&middot;&nbsp;
                            <a href="https://github.com/Khalid-Abbas-IU" className="text-purple-400">GitHub</a>
                            &nbsp;&middot;&nbsp;
                            <a href="https://www.linkedin.com/in/khalid-abbas-869831193" className="text-purple-400">LinkedIn</a>
                            &nbsp;&middot;&nbsp;
                            <a href="https://www.upwork.com/freelancers/khalidabbas" className="text-purple-400">Upwork</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
