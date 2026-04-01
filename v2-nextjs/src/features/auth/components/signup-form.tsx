"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema, SignUpSchemaTypes } from "../auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<SignUpSchemaTypes>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });

  const onSubmit: SubmitHandler<SignUpSchemaTypes> = (data) => {
    console.log(data);
  }; 

  const handleErrors = () => {

  };

  return (
    <Card className="w-full max-w-sm h-auto pt-6">
      <CardHeader className="justify-items-center gap-2">
        <CardTitle className="text-xl font-semibold">Welcome to NoteFlow!</CardTitle>
        <CardDescription>Enter your details to sign up</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form 
          id="noteflow-signup-form"
          className="w-full h-auto max-w-lg p-4 pt-2 pb-0 flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)} 
          noValidate
        >
          <FieldSet className="w-full h-full flex items-center justify-center">
            <FieldLegend className="sr-only">NoteFlow Sign In form</FieldLegend>
            <FieldGroup className="w-full h-full gap-1">
              <Field data-invalid={errors.user_name ? true : false} className="min-h-23">
                <FieldLabel htmlFor="user-name">
                  Username
                </FieldLabel>
                <Input 
                  type="text" 
                  id="user-name"
                  className="text-sm md:text-base h-10" 
                  placeholder="e.g john doe"
                  aria-invalid={errors.user_name ? true : false} 
                  { ...register("user_name", {
                    onChange: handleErrors,
                  }) } />
                { errors.user_name && <FieldError className="text-right text-xs" errors={[errors.user_name]} />}
              </Field>
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
              <Field data-invalid={errors.user_confirm_password ? true : false} className="min-h-23">
                <div className="w-full flex items-center justify-between">
                  <FieldLabel className="justify-self-start" htmlFor="user-confirm-password">
                    Confirm Password
                  </FieldLabel>
                </div>
                <Input 
                  type="password" 
                  id="user-confirm-password"
                  className="text-sm md:text-base h-10" 
                  placeholder="e.g johndoe1437-xYz-PloL" 
                  aria-invalid={errors.user_confirm_password ? true : false} 
                  { ...register("user_confirm_password", {
                    onChange: handleErrors,
                  }) } />
                { errors.user_confirm_password && <FieldError errors={[errors.user_confirm_password]} className="text-right text-xs" /> }
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="">
        <Button 
          type="submit" 
          form="noteflow-signup-form"
          className="w-full h-10 font-semibold"
          size={"lg"}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  )
};

export default SignUpForm