import "./globals.css";

export const metadata = {
    title: "My Portfolio",
    description: "Showcasing my projects and skills as a Full-Stack Developer",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            {/* Google Fonts Integration */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
        </head>
        <body
            className={`font-sans antialiased bg-background text-foreground min-h-screen`}
        >
        {children}
        </body>
        </html>
    );
}
