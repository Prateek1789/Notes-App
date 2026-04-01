"use client"

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema as SignInSchema, LoginSchemaTypes as SignInSchemaTypes } from "../auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { 
  FieldSet, 
  FieldLegend, 
  FieldGroup,
  Field,
  FieldLabel,
  FieldError 
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NoteFlowLogo from "@/components/icons/NoteFlowLogo";

const SignInForm = () => {
  const { 
    register, 
    handleSubmit, 
    setError, 
    clearErrors, 
    formState: { errors, isSubmitting } 
  } = useForm<SignInSchemaTypes>({
    resolver: zodResolver(SignInSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignInSchemaTypes> = ({ user_email: email, user_password: password }) => {
    console.log(email, password);
  };

  const handleErrors = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof SignInSchemaTypes;
    if (errors[key]) {
      clearErrors(key);
      return;
    }
  };

  return (
    <Card className="w-full max-w-sm h-auto pt-6">
      <CardHeader className="justify-items-center gap-2">
        <NoteFlowLogo />
        <CardTitle className="text-xl font-semibold">Welcome Back!</CardTitle>
        <CardDescription>Enter your credentials to sign in</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form 
          id="noteflow-sign-in-form"
          className="w-full h-auto max-w-lg p-4 pt-2 pb-0 flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)} 
          noValidate
        >
          <FieldSet className="w-full h-full flex items-center justify-center">
            <FieldLegend className="sr-only">NoteFlow Sign In form</FieldLegend>
            <FieldGroup className="w-full h-full gap-1">
              <Field data-invalid={errors.user_email ? true : false} className="min-h-23">
                <FieldLabel htmlFor="user-email">
                  Email Address
                </FieldLabel>
                <Input 
                  type="email" 
                  id="user-email"
                  className="text-sm md:text-base h-10" 
                  placeholder="e.g johndoe1437@xyz.com"
                  aria-invalid={errors.user_email ? true : false} 
                  { ...register("user_email", {
                    onChange: handleErrors,
                  }) } />
                { errors.user_email && <FieldError className="text-right text-xs" errors={[errors.user_email]} />}
              </Field>
              <Field data-invalid={errors.user_password ? true : false} className="min-h-23">
                <div className="w-full flex items-center justify-between">
                  <FieldLabel className="justify-self-start" htmlFor="user-password">
                    Password
                  </FieldLabel>
                  <Link href={"#"} className="text-foreground text-xs">Forgot Password?</Link>
                </div>
                <Input 
                  type="password" 
                  id="user-password"
                  className="text-sm md:text-base h-10" 
                  placeholder="e.g johndoe1437-xYz-PloL" 
                  aria-invalid={errors.user_password ? true : false} 
                  { ...register("user_password", {
                    onChange: handleErrors,
                  }) } />
                { errors.user_password && <FieldError errors={[errors.user_password]} className="text-right text-xs" /> }
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button 
          type="submit" 
          form="noteflow-sign-in-form"
          className="w-full h-10 font-semibold"
          size={"lg"}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </CardFooter>
    </Card>
  )
};

export default SignInForm