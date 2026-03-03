import './globals.css';

export const metadata = {
  title: 'LoRRI.ai — Autonomous Freight Layer | LogisticsNow',
  description: 'AI-Native Logistics Command Center. Deploy agents that solve freight — 50,000+ lanes, ₹12.5 Lakh Cr real-time intelligence, ±5% rate accuracy.',
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
