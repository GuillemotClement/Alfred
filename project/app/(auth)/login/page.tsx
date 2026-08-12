"use client";

import FormInputField from "@/app/_components/form/FormInputField";
import PageContainer from "@/app/_components/layout/PageContainer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormData, loginSchema } from "./_schema/schema";
import { useForm } from "react-hook-form";
import FormAction from "@/app/_components/form/FormAction";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBasicLayout from "@/app/_components/form/FormBasicLayout";

export default function LoginPage(){
  const defaultValues = {
    email: "",
    password: ""
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues
  });

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null | undefined>(null);

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password
    },
    {
      onRequest: () => {
        setIsLoading(true)
      }
    });

    setIsLoading(false);

    if(error){
      console.error("error better auth: ", error);
      setGlobalError(error.message);
      reset();
      return;
    }

    router.push("/")
  }

  return (
    <PageContainer>
      <FormBasicLayout onSubmit={handleSubmit(onSubmit)} formTitle="Connexion">

        <FormInputField
          label="Email"
          id="email"
          register={register("email")}
          error={errors.email?.message}
          type="email"
        />

        <FormInputField
          label="Mot de passe"
          id="password"
          register={register("password")}
          error={errors.password?.message}
          type="password"
        />

        {globalError && (
          <p className="italic text-xs text-red-500 text-center mb-5 font-bold">
            {globalError}
          </p>
        )}

        <FormAction
          reset={reset}
          submitText="Connexion"
          isSubmiting={isLoading}
        />
      </FormBasicLayout>
    </PageContainer>
  );
}