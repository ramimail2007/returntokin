import { Shield } from 'lucide-react';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-80px-300px)] flex items-center justify-center px-5 py-16">
      <div className="flex max-w-[900px] w-full bg-white rounded-[18px] border border-border shadow-sm overflow-hidden">
        <div className="flex-1 p-8 md:p-10">
          <h1 className="text-[24px] font-bold text-navy mb-1">Create your account</h1>
          <p className="text-sm text-text-secondary mb-6">Join ReturnToKin.</p>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-navy mb-1">Full name</label><input className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
              <div><label className="block text-sm font-medium text-navy mb-1">Email</label><input type="email" className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-navy mb-1">Password</label><input type="password" className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
              <div><label className="block text-sm font-medium text-navy mb-1">Confirm password</label><input type="password" className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
            </div>
            <label className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="checkbox" className="mt-1 accent-teal" />
              I agree to the <Link href="/terms" className="text-teal hover:underline">Terms of Use</Link> and <Link href="/privacy" className="text-teal hover:underline">Privacy Policy</Link>.
            </label>
            <Button variant="primary" size="lg" className="w-full">Create account</Button>
            <p className="text-sm text-text-secondary text-center">Already have an account? <Link href="/login" className="text-teal font-semibold hover:underline">Sign in</Link></p>
          </div>
        </div>
        <div className="hidden md:flex w-[280px] bg-navy p-8 flex-col justify-center">
          <Shield size={28} className="text-teal mb-4" />
          <p className="text-white/90 text-sm font-semibold leading-relaxed">Join a global network working to help families find answers and reconnect safely.</p>
        </div>
      </div>
    </div>
  );
}