'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, MessageSquare, Briefcase, DollarSign, ArrowRight, TrendingUp } from 'lucide-react';

interface Stats {
  blog: number;
  testimonials: number;
  portfolio: number;
  pricing: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/blog', { credentials: 'include' }).then((r) => r.json()).then((arr) => arr.length).catch(() => 0),
      fetch('/api/testimonials', { credentials: 'include' }).then((r) => r.json()).then((arr) => arr.length).catch(() => 0),
      fetch('/api/portfolio', { credentials: 'include' }).then((r) => r.json()).then((arr) => arr.length).catch(() => 0),
      fetch('/api/pricing', { credentials: 'include' }).then((r) => r.json()).then((arr) => Array.isArray(arr) ? arr.length : 0).catch(() => 0),
    ]).then(([blog, testimonials, portfolio, pricing]) => {
      setStats({ blog, testimonials, portfolio, pricing });
    });
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="text-accent" size={28} />
        <h1 className="font-heading font-bold text-3xl text-primary">
          Admin Dashboard
        </h1>
      </div>
      <p className="text-text/80 mb-8">
        Manage your website content from here. Quick stats below.
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-card shadow-soft border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/70">Blog Posts</p>
              <p className="text-2xl font-heading font-bold text-primary mt-1">
                {stats === null ? '—' : stats.blog}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="text-accent" size={24} />
            </div>
          </div>
          <Link
            href="/admin/blog"
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Manage <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white rounded-card shadow-soft border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/70">Testimonials</p>
              <p className="text-2xl font-heading font-bold text-primary mt-1">
                {stats === null ? '—' : stats.testimonials}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <MessageSquare className="text-accent" size={24} />
            </div>
          </div>
          <Link
            href="/admin/testimonials"
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Manage <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white rounded-card shadow-soft border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/70">Portfolio</p>
              <p className="text-2xl font-heading font-bold text-primary mt-1">
                {stats === null ? '—' : stats.portfolio}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Briefcase className="text-accent" size={24} />
            </div>
          </div>
          <Link
            href="/admin/portfolio"
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Manage <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white rounded-card shadow-soft border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/70">Pricing Rows</p>
              <p className="text-2xl font-heading font-bold text-primary mt-1">
                {stats === null ? '—' : stats.pricing}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <DollarSign className="text-accent" size={24} />
            </div>
          </div>
          <Link
            href="/admin/pricing"
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Manage <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <h2 className="font-heading font-semibold text-lg text-primary mb-4">
        Quick actions
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/blog"
          className="group flex items-center gap-4 p-6 bg-white rounded-card shadow-soft border border-gray-100 hover:shadow-soft-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <FileText className="text-accent" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-semibold text-primary">Blog Posts</h2>
            <p className="text-sm text-text/80">Create and edit blog content</p>
          </div>
          <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 transition" size={20} />
        </Link>

        <Link
          href="/admin/testimonials"
          className="group flex items-center gap-4 p-6 bg-white rounded-card shadow-soft border border-gray-100 hover:shadow-soft-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <MessageSquare className="text-accent" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-semibold text-primary">Testimonials</h2>
            <p className="text-sm text-text/80">Manage client reviews</p>
          </div>
          <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 transition" size={20} />
        </Link>

        <Link
          href="/admin/portfolio"
          className="group flex items-center gap-4 p-6 bg-white rounded-card shadow-soft border border-gray-100 hover:shadow-soft-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <Briefcase className="text-accent" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-semibold text-primary">Portfolio</h2>
            <p className="text-sm text-text/80">Add and edit projects</p>
          </div>
          <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 transition" size={20} />
        </Link>

        <Link
          href="/admin/pricing"
          className="group flex items-center gap-4 p-6 bg-white rounded-card shadow-soft border border-gray-100 hover:shadow-soft-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <DollarSign className="text-accent" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-semibold text-primary">Pricing</h2>
            <p className="text-sm text-text/80">Edit prices per region</p>
          </div>
          <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 transition" size={20} />
        </Link>
      </div>
    </div>
  );
}
