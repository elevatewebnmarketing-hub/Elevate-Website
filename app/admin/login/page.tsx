'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Invalid password');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <a href="/" className="inline-block mb-8">
          <Logo variant="black" width={180} height={60} />
        </a>

        <div className="bg-white rounded-card-lg shadow-soft-xl p-8 border border-gray-100">
          <h1 className="font-heading font-bold text-2xl text-primary mb-2">
            Admin Login
          </h1>
          <p className="text-text/80 text-sm mb-6">
            Enter your password to access the admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-xs text-text/60">
            Default password: elevate2024. Set ADMIN_PASSWORD in .env to change.
          </p>
        </div>
      </div>
    </div>
  );
}
