'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { LayoutDashboard, FileText, MessageSquare, Briefcase, Menu, X } from 'lucide-react';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/blog', label: 'Blog', icon: FileText, match: (p: string) => p.startsWith('/admin/blog') },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  ];

  return (
    <div className="admin-panel min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
              <Logo variant="black" width={120} height={38} />
              <span className="hidden sm:inline text-xs font-medium text-text/60 uppercase tracking-wider">Admin</span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1" aria-label="Admin navigation">
              {navLinks.map(({ href, label, icon: Icon, match }) => {
                const isActive = match ? match(pathname) : pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text/70 hover:text-accent hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="sm:hidden p-2 rounded-lg text-text/70 hover:bg-gray-50"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text/80 hover:text-accent hover:bg-gray-50 rounded-lg transition"
              >
                View Site
              </Link>
              <form action="/api/auth/logout" method="POST" className="inline">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>

          {mobileOpen && (
            <nav className="sm:hidden py-3 border-t border-gray-100" aria-label="Admin mobile navigation">
              <div className="flex flex-col gap-1">
                {navLinks.map(({ href, label, icon: Icon, match }) => {
                  const isActive = match ? match(pathname) : pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                        isActive ? 'bg-accent/10 text-accent' : 'text-text/70 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main>{children}</main>
      </div>
    </div>
  );
}
