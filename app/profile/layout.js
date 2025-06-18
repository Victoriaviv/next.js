// src/app/layout.jsx (or _app.jsx in older Next.js)
import { AuthProvider } from 'context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
