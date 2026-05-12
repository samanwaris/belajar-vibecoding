import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Truck, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormValues) {
    // Mock login
    console.log(values);
    login('admin@logitrack.com', '123456');
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary/5 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-brand-primary/10 rounded-2xl mb-4">
            <Truck className="text-brand-primary w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">LogiTrack</h1>
          <p className="text-surface-muted">Sistem Manajemen Transportasi Logistik</p>
        </div>

        <Card className="bg-surface-card border-surface-border shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">Selamat Datang Kembali</CardTitle>
            <CardDescription className="text-surface-muted">
              Masukkan kredensial Anda untuk mengakses dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surface-muted">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-muted" />
                          <Input
                            placeholder="admin@logitrack.com"
                            className="pl-10 bg-surface-bg border-surface-border text-white focus:ring-brand-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surface-muted">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-muted" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 bg-surface-bg border-surface-border text-white focus:ring-brand-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-11 font-semibold">
                  Masuk ke Dashboard
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-surface-muted">
          &copy; 2024 LogiTrack System. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}
