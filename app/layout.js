
import Navbar from '@/components/Navbar';
import SessionWrapper from '@/components/SessionWrapper';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar/>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
