import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { signupResolvers } from "../resolvers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactNode } from "react";

export default function Register({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof signupResolvers>>({
    resolver: zodResolver(signupResolvers),
    defaultValues: {
      username: "",
      fullname: "",
      gender: "male",
      password: "",
      cpassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof signupResolvers>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
          <CardTitle className="text-xl">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormFieldConstructor
                    form={form}
                    name="fullname"
                    label="Fullname"
                    placeholder="John Doe"
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue="male"
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormFieldConstructor
                    form={form}
                    name="username"
                    label="Username"
                    placeholder="JohnDoe@123"
                  />
                  <FormFieldConstructor
                    form={form}
                    name="password"
                    label="Password"
                    type="password"
                  ></FormFieldConstructor>
                  <FormFieldConstructor
                    form={form}
                    name="cpassword"
                    label="Confrim Password"
                  ></FormFieldConstructor>

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="my-4 text-center text-sm">
            Do you already have an account?{" "}
            <NavLink to="/login" end className="underline underline-offset-4">
              Login
            </NavLink>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

type nameSchema = keyof z.infer<typeof signupResolvers>;

interface TFormFieldConstructor {
  form: UseFormReturn<
    {
      fullname: string;
      gender: "male" | "female";
      username: string;
      password: string;
      cpassword: string;
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
