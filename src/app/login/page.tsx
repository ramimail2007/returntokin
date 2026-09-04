import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px-300px)] flex items-center justify-center px-5 py-16">
      <div className="flex max-w-[900px] w-full bg-white rounded-[18px] border border-border shadow-sm overflow-hidden">
        {/* Left: Form */}
        <div className="flex-1 p-8 md:p-10">
          <h1 className="text-[24px] font-bold text-navy mb-1">Welcome back</h1>
          <p className="text-sm text-text-secondary mb-6">Sign in to your account.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Password</label>
              <input type="password" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" className="accent-teal" /> Remember me</label>
              <a href="#" className="text-teal hover:underline">Forgot password?</a>
            </div>
            <Button variant="primary" size="lg" className="w-full">Sign in</Button>
            <p className="text-sm text-text-secondary text-center">Don&apos;t have an account? <Link href="/signup" className="text-teal font-semibold hover:underline">Create account</Link></p>
          </div>
        </div>
        {/* Right: Mission */}
        <div className="hidden md:flex w-[280px] bg-navy p-8 flex-col justify-center">
          <Shield size={28} className="text-teal mb-4" />
          <p className="text-white/90 text-sm font-semibold leading-relaxed">ReturnToKin is a trusted global network that connects missing-person reports, sightings and institutional information to help families find answers and reconnect safely.</p>
        </div>
      </div>
    </div>
  );
}