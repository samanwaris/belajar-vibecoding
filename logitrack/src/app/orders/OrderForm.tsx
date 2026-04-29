import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  customer: z.string().min(2, {
    message: "Nama pelanggan minimal 2 karakter.",
  }),
  origin: z.string().min(1, {
    message: "Pilih kota asal.",
  }),
  destination: z.string().min(1, {
    message: "Pilih kota tujuan.",
  }),
  weight: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Berat harus lebih dari 0 kg.",
  }),
  itemType: z.string().min(1, {
    message: "Pilih jenis barang.",
  }),
  estimatedDate: z.string().min(1, {
    message: "Pilih estimasi tanggal.",
  }),
});

interface OrderFormProps {
  onSuccess?: () => void;
}

const CITIES = ['Jakarta', 'Bandung', 'Surabaya', 'Semarang', 'Medan', 'Makassar', 'Malang', 'Yogyakarta', 'Bali', 'Palembang', 'Manado'];
const ITEM_TYPES = ['General Cargo', 'Electronic', 'Fragile', 'Perishable', 'Liquid'];

export function OrderForm({ onSuccess }: OrderFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      origin: "",
      destination: "",
      weight: "",
      itemType: "",
      estimatedDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulasikan penambahan data
    setTimeout(() => {
      onSuccess?.();
    }, 500);
  }

  return (
    <DialogContent className="sm:max-w-[425px] bg-surface-card border-surface-border text-white">
      <DialogHeader>
        <DialogTitle>Buat Pesanan Baru</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pelanggan</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Masukkan nama pelanggan" 
                    {...field} 
                    className="bg-surface-bg border-surface-border text-white focus:ring-brand-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                        <SelectValue placeholder="Pilih asal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-surface-card border-surface-border text-white">
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tujuan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                        <SelectValue placeholder="Pilih tujuan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-surface-card border-surface-border text-white">
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat (kg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Contoh: 10" 
                      {...field} 
                      className="bg-surface-bg border-surface-border text-white focus:ring-brand-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="itemType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Barang</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                        <SelectValue placeholder="Pilih jenis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-surface-card border-surface-border text-white">
                      {ITEM_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="estimatedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimasi Tanggal</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    className="bg-surface-bg border-surface-border text-white focus:ring-brand-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="submit" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white w-full"
            >
              Simpan Pesanan
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
