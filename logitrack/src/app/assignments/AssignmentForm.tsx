import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Truck, User, Package } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { MOCK_ORDERS } from "@/mock/orders";
import { MOCK_FLEET } from "@/mock/fleet";
import { MOCK_DRIVERS } from "@/mock/drivers";

const formSchema = z.object({
  orderId: z.string().min(1, {
    message: "Pilih pesanan.",
  }),
  fleetId: z.string().min(1, {
    message: "Pilih armada.",
  }),
  driverId: z.string().min(1, {
    message: "Pilih pengemudi.",
  }),
});

interface AssignmentFormProps {
  defaultOrderId?: string;
  onSuccess?: () => void;
}

export function AssignmentForm({ defaultOrderId, onSuccess }: AssignmentFormProps) {
  const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending');
  const availableFleet = MOCK_FLEET.filter(f => f.status === 'available');
  const availableDrivers = MOCK_DRIVERS.filter(d => d.status === 'available');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: defaultOrderId || "",
      fleetId: "",
      driverId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const order = MOCK_ORDERS.find(o => o.id === values.orderId);
    const fleet = MOCK_FLEET.find(f => f.id === values.fleetId);
    const driver = MOCK_DRIVERS.find(d => d.id === values.driverId);

    toast.success("Penugasan Berhasil!", {
      description: `Order ${order?.id} ditugaskan ke ${driver?.name} menggunakan ${fleet?.licensePlate}.`,
    });
    onSuccess?.();
  }

  return (
    <DialogContent className="sm:max-w-[500px] bg-surface-card border-surface-border text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-brand-primary" />
          Penugasan Pengiriman
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <FormField
            control={form.control}
            name="orderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-surface-muted" /> Pilih Pesanan
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                      <SelectValue placeholder="Pilih pesanan pending" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-surface-card border-surface-border text-white">
                    {pendingOrders.length > 0 ? (
                      pendingOrders.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.id} - {o.customer} ({o.origin} → {o.destination})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>Tidak ada pesanan pending</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fleetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-surface-muted" /> Pilih Armada
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                        <SelectValue placeholder="Pilih armada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-surface-card border-surface-border text-white">
                      {availableFleet.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.licensePlate} ({f.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-surface-muted" /> Pilih Pengemudi
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-surface-bg border-surface-border text-white">
                        <SelectValue placeholder="Pilih pengemudi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-surface-card border-surface-border text-white">
                      {availableDrivers.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name} ({d.rating} ★)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
            <Button 
              type="submit" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white w-full h-11"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses Penugasan...
                </>
              ) : (
                "Konfirmasi Penugasan"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
