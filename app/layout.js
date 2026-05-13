import './globals.css';

export const metadata = {
  title: 'Simple Admin Panel',
  description: 'Product management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
