export default function manifest() {
    return {
        name: 'Khalid Abbas Jan — Senior Full-Stack Developer',
        short_name: 'KA Portfolio',
        description:
            'SaaS, cloud, and interactive 2D canvas tools — React, Next.js, Node.js, Fabric.js, Konva.js, AWS.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#7c3aed',
        orientation: 'portrait-primary',
        scope: '/',
        lang: 'en',
        categories: ['portfolio', 'developer', 'technology'],
        icons: [
            {
                src: '/favicon.ico',
                sizes: '64x64 32x32 24x24 16x16',
                type: 'image/x-icon'
            }
        ],
        shortcuts: [
            {
                name: 'View Projects',
                short_name: 'Projects',
                description: 'View my latest projects and work',
                url: '/#projects'
            },
            {
                name: 'Contact Me',
                short_name: 'Contact',
                description: 'Get in touch for collaborations',
                url: '/#contact'
            }
        ]
    }
}