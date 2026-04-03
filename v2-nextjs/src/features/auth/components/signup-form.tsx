"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, FocusEvent } from "react";
import { createClient } from "@/lib/supabase/client";
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
import NoteFlowLogo from "@/components/icons/NoteFlowLogo";
import { LoaderCircle } from "lucide-react";

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

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpSchemaTypes> = async ({ user_email: email, user_password: password, user_name }) => {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      if (error) throw error;
      router.push("/signup-success?verified=true");
    }
    catch(err) {
      setError("root", {
        type: "400",
        message: `${err instanceof Error ? err.message : "An error occured"}`,
      });
    }
  };
  
  const validateOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof SignUpSchemaTypes;

    if (!e.target.value) return;      // if Input field has no value return early
    trigger(key);                     // trigger validation on blur only if the input field has a value
  };

  const handleErrors = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof SignUpSchemaTypes;

    if (errors[key] || errors.root) {   // clear errors if a field or the root has an error
      clearErrors(key);
      clearErrors("root");
    };
  };

  return (
    <Card className="w-full max-w-sm pt-0 gap-1">
      <CardHeader className="pt-4 md:pt-6 justify-items-center gap-0 md:gap-2">
        <span aria-hidden={true}><NoteFlowLogo /></span>
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
            <FieldLegend className="sr-only">NoteFlow Sign Up form</FieldLegend>
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
                    onBlur: validateOnBlur,
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
                    onBlur: validateOnBlur,
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
                    onBlur: validateOnBlur
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
                    onBlur: validateOnBlur,
                  }) } />
                { (errors.user_confirm_password || errors.root) && 
                  <FieldError errors={[errors.user_confirm_password || errors.root]} className="text-right text-xs" /> 
                }
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="mt-1">
        <Button 
          type="submit" 
          form="noteflow-signup-form"
          className="w-full h-10 font-semibold"
          size={"lg"}
          disabled={isSubmitting}
        >
          { isSubmitting && <LoaderCircle size={16} className="animate-spin duration-400 repeat-infinite" />}
          { isSubmitting ? "Signing Up..." : "Sign Up" }
        </Button>
      </CardFooter>
    </Card>
  )
};

export default SignUpForm