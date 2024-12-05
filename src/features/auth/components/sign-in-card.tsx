"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/features/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChartColumnIncreasing, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../api/use-login";
import { ErrorAlert } from "@/components/alerts/error-alert";

export const SignInCard = () => {
  const { mutate } = useLogin();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setSubmitting(true);
    mutate(
      { json: values },
      {
        onError: () => {
          setShowError(true);
          setSubmitting(false);
          form.setValue("password", "");
        },
      }
    );
  };

  return (
    <>
      <Card className="w-full h-full md:w-[487px] border border-transparent dark:border-neutral-800 shadow-none">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <ChartColumnIncreasing size={42} />
          </div>
          <CardTitle className="text-2xl text-center">
            Ingresa a <span className='tracking-wide pl-2'>iTrackInvest</span>
          </CardTitle>
          {/* <CardDescription className="text-center">
            por{" "}
            <Link
              href={"https://hospicemadreteresa.org.ar/"}
              className="hover:underline">
              Hospice Madre Teresa
            </Link>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={submitting ? true : false}
                size={"lg"}
                className="w-full">
                {(submitting && (
                  <>
                    <Loader2 className="animate-spin" />
                    Cargando...
                  </>
                )) ||
                  "Ingresar"}
              </Button>
            </form>
          </Form>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="#"
                className="font-semibold text-primary hover:text-primary/80 hover:underline">
                Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-center text-muted-foreground">
            Al iniciar sesión, aceptas nuestros{" "}
            <a href="#" className="underline hover:text-primary">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline hover:text-primary">
              Política de Privacidad.
            </a>
          </p>
        </CardFooter>
      </Card>
      {showError && (
        <ErrorAlert
          title="Ocurrió un error al iniciar sesión."
          message="Revise la dirección de correo electrónico y la contraseña."
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
};
