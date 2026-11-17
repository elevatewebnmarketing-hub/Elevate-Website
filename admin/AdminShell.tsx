'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { LayoutDashboard, FileText, MessageSquare, Briefcase, DollarSign, Menu, X, Receipt, ClipboardList, ShieldAlert, Wallet, Inbox, FolderKanban, ChevronDown } from 'lucide-react';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [twoFactorOff, setTwoFactorOff] = useState(false);
  const isLogin = pathname === '/admin/login';
  // Print view: just the document, no admin chrome.
  const isPrint = pathname.endsWith('/print');

  useEffect(() => {
    if (isLogin) return;
    fetch('/api/auth/session', { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setTwoFactorOff(!!d && d.twoFactorEnabled === false))
      .catch(() => {});
  }, [isLogin]);

  if (isLogin || isPrint) {
    return <div className="admin-panel min-h-screen">{children}</div>;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Leads', icon: Inbox },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban, match: (p: string) => p.startsWith('/admin/projects') },
    { href: '/admin/invoices', label: 'Invoices', icon: Receipt, match: (p: string) => p.startsWith('/admin/invoices') },
    { href: '/admin/intakes', label: 'Onboarding', icon: ClipboardList, match: (p: string) => p.startsWith('/admin/intakes') },
    { href: '/admin/payments', label: 'Payments', icon: Wallet },
  ];
  // Website content pages, grouped so the top bar fits a laptop screen.
  const contentLinks = [
    { href: '/admin/blog', label: 'Blog', icon: FileText, match: (p: string) => p.startsWith('/admin/blog') },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
    { href: '/admin/pricing', label: 'Pricing', icon: DollarSign, match: (p: string) => p.startsWith('/admin/pricing') },
  ];
  const contentActive = contentLinks.some(({ href, match }) => (match ? match(pathname) : pathname === href));

  return (
    <div className="admin-panel min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
              <Logo variant="black" width={120} height={38} />
              <span className="hidden sm:inline text-xs font-medium text-text/60 uppercase tracking-wider">Admin</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Admin navigation">
              {navLinks.map(({ href, label, icon: Icon, match }) => {
                const isActive = match ? match(pathname) : pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-2.5 2xl:px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text/70 hover:text-accent hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} className="hidden 2xl:block" aria-hidden />
                    {label}
                  </Link>
                );
              })}
              <details className="relative group" key={pathname}>
                <summary
                  className={`list-none cursor-pointer flex items-center gap-1 px-2.5 2xl:px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition [&::-webkit-details-marker]:hidden ${
                    contentActive ? 'bg-accent/10 text-accent' : 'text-text/70 hover:text-accent hover:bg-gray-50'
                  }`}
                >
                  Site content <ChevronDown size={15} className="transition group-open:rotate-180" aria-hidden />
                </summary>
                <div className="absolute right-0 mt-1 w-48 rounded-xl border border-gray-200 bg-white shadow-lg p-1.5 z-50">
                  {contentLinks.map(({ href, label, icon: Icon, match }) => {
                    const isActive = match ? match(pathname) : pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-accent/10 text-accent' : 'text-text/80 hover:bg-gray-50'}`}
                      >
                        <Icon size={16} aria-hidden />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </details>
            </nav>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden p-2 rounded-lg text-text/70 hover:bg-gray-50"
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
            <nav className="lg:hidden py-3 border-t border-gray-100" aria-label="Admin mobile navigation">
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
                <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-text/50">Site content</p>
                {contentLinks.map(({ href, label, icon: Icon, match }) => {
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

      {twoFactorOff && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-start gap-2">
            <ShieldAlert size={18} className="mt-0.5 flex-shrink-0" aria-hidden />
            <p>
              Two-step login is off, so the password alone protects client data and invoices. Run{' '}
              <code className="font-mono text-xs bg-amber-100 px-1 rounded">node scripts/admin-security-setup.mjs</code>, add{' '}
              <code className="font-mono text-xs bg-amber-100 px-1 rounded">ADMIN_TOTP_SECRET</code> in Vercel and redeploy.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main>{children}</main>
      </div>
    </div>
  );
}
