import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center p-4 text-center">
      <div className="p-4 bg-status-danger/10 rounded-full mb-6">
        <AlertTriangle size={48} className="text-status-danger" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-surface-muted mb-8 max-w-md">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white">
        <Link to="/dashboard">
          <Home className="mr-2 h-4 w-4" />
          Kembali ke Dashboard
        </Link>
      </Button>
    </div>
  );
}
