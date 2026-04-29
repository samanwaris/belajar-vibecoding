import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
  licensePlate: z.string().min(5, {
    message: "Plat nomor minimal 5 karakter.",
  }),
  type: z.string().min(1, {
    message: "Pilih tipe kendaraan.",
  }),
  capacity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Kapasitas harus lebih dari 0 kg.",
  }),
  status: z.string().min(1, {
    message: "Pilih status awal.",
  }),
});

interface FleetFormProps {
  onSuccess?: () => void;
}

const VEHICLE_TYPES = ['CDE', 'CDD', 'Wingbox', 'Trailer'];
const INITIAL_STATUSES = [
  { value: 'available', label: 'Tersedia' },
  { value: 'maintenance', label: 'Maintenance' },
];

export function FleetForm({ onSuccess }: FleetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: "",
      type: "",
      capacity: "",
      status: "available",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Armada berhasil didaftarkan!", {
      description: `Kendaraan ${values.licensePlate} telah masuk ke sistem.`,
    });
    onSuccess?.();
  }

  return (
    <DialogContent className="sm:max-w-[425px] bg-surface-card border-surface-border text-white">
      <DialogHeader>
        <DialogTitle>Daftarkan Armada Baru</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plat Nomor</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Contoh: B 1234 ABC" 
                    {...field} 
                    className="bg-surface-bg border-surface-border text-white focus:ring-brand-primary uppercase"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Kendaraan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-surface-card border-surface-border text-white">
                    {VEHICLE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapasitas Maksimal (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Contoh: 4000" 
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Awal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-surface-card border-surface-border text-white">
                    {INITIAL_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="submit" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mendaftarkan...
                </>
              ) : (
                "Daftar Armada"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
