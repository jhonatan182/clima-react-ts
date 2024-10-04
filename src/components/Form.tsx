import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { countries } from "@/data";
import { SearchType } from "@/types";

type FormClimaProps = {
  fetchWeather: (searchType: SearchType) => Promise<void>;
};

const weatherSchema = z.object({
  ciudad: z.string().min(2, {
    message: "Nombre de la ciudad obligatorio",
  }),
  pais: z.string().min(2, { message: "Seleccione un pais" }),
});

export default function FormClima({ fetchWeather }: FormClimaProps) {
  const form = useForm<z.infer<typeof weatherSchema>>({
    defaultValues: {
      ciudad: "",
      pais: "",
    },
    resolver: zodResolver(weatherSchema),
  });

  const onSubmit = (values: z.infer<typeof weatherSchema>) => {
    console.log("enviando", values);

    fetchWeather({
      city: values.ciudad,
      country: values.pais,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ciudad"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Ciudad</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ciudad"
                  {...field}
                  className="bg-transparent placeholder:text-white"
                  error={form.formState.errors.ciudad}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pais"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pais</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="bg-transparent"
                    error={form.formState.errors.pais}
                  >
                    <SelectValue placeholder="-- Selecciona un pais --" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full text-white rounded bg-primary font-bold hover:bg-primary/90"
        >
          Consultar Clima
        </Button>
      </form>
    </Form>
  );
}
