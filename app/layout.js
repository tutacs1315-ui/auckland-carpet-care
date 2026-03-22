import './globals.css';

export const metadata = {
  title: 'Auckland Carpet Care | Professional Carpet & Upholstery Cleaning',
  description:
    'Auckland\'s trusted carpet and upholstery cleaning specialists. Steam cleaning, stain removal, commercial & residential services. Free quotes. Same-day available.',
  keywords:
    'carpet cleaning Auckland, upholstery cleaning, steam cleaning, stain removal, carpet care NZ',
  openGraph: {
    title: 'Auckland Carpet Care | Professional Carpet & Upholstery Cleaning',
    description:
      'Auckland\'s trusted carpet and upholstery cleaning specialists. Steam cleaning, stain removal, commercial & residential services.',
    type: 'website',
    locale: 'en_NZ',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
