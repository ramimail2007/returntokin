import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px-300px)] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="text-[80px] font-bold text-navy/10 mb-4">404</div>
        <h1 className="text-[24px] font-bold text-navy mb-2">This page could not be found.</h1>
        <p className="text-sm text-text-secondary mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/"><Button variant="primary"><ArrowLeft size={16} /> Return to ReturnToKin</Button></Link>
      </div>
    </div>
  );
}