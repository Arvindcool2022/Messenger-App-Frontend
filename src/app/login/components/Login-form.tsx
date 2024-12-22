import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router";
import { ForgotPass } from "./Forgot-pass";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginResolvers } from "../resolvers";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactNode } from "react";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof loginResolvers>>({
    resolver: zodResolver(loginResolvers),
    defaultValues: { username: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof loginResolvers>) {
    console.log(values);
    form.reset();
  }

  return (
    <div
      className={cn("flex flex-col justify-center gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormFieldConstructor
                    form={form}
                    name="username"
                    label="Username"
                    placeholder="John_Doe@123"
                  />
                  <FormFieldConstructor
                    form={form}
                    name="password"
                    type="password"
                    label="Password"
                  >
                    <div className="flex justify-end">
                      <ForgotPass />
                    </div>
                  </FormFieldConstructor>

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <NavLink
                    to="/signup"
                    end
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </NavLink>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

type nameSchema = keyof z.infer<typeof loginResolvers>;

interface TFormFieldConstructor {
  form: UseFormReturn<
    {
      username: string;
      password: string;
    },
    any,
    undefined
  >;
  name: nameSchema;
  label: string;
  placeholder?: string;
  type?: string;
  children?: ReactNode;
}

const FormFieldConstructor = ({
  form,
  name,
  label,
  placeholder = "",
  type = "text",
  children = null,
}: TFormFieldConstructor) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="grid gap-2">
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
            {children}
          </FormItem>
        </div>
      )}
    />
  );
};
