import './globals.css';
import ReduxProvider from '../store/Provider';

export const metadata = {
  title: 'Your App',
  description: 'A Next.js app with Redux and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
