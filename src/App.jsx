import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import FavoriteButton from './components/FavoriteButton';
import { tools } from './registry';
import { ToastProvider, ToastViewport } from './components/ui/Toast';
import Preloader from './components/Preloader'; // Import Preloader

function App() {
  const location = useLocation(); // Use useLocation hook
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger loading on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Simulated delay for "patience" and aesthetic

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ToastProvider>
      <Preloader visible={loading} /> {/* Add Preloader component */}
      <Routes>
        <Route path="/" element={<Home />} />
        {tools.map(tool => (
          <Route
            key={tool.id}
            path={tool.path}
            element={
              <Suspense fallback={
                <div style={{
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-pink)',
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  加载中...
                </div>
              }>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: '1', padding: '40px 20px' }}>
                    <nav style={{
                      marginBottom: '40px',
                      maxWidth: '1200px',
                      margin: '0 auto 40px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative'
                    }}>
                      <Link to="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        background: 'var(--surface-cream)',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        transition: 'var(--transition-smooth)'
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-white)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-cream)'}
                      >
                        <i className="ri-arrow-left-line"></i>
                        返回首页
                      </Link>
                      <FavoriteButton toolId={tool.id} style={{ position: 'static' }} />
                    </nav>
                    <tool.component />
                  </div>
                  <Footer />
                </div>
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastViewport />
    </ToastProvider >
  );
}

export default App;
