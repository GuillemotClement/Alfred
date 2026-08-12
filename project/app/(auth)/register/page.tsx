"use client";

import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "./_schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/_components/layout/PageContainer";
import FormBasicLayout from "@/app/_components/form/FormBasicLayout";
import FormInputField from "@/app/_components/form/FormInputField";
import FormAction from "@/app/_components/form/FormAction";

export default function RegisterPAge() {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    // image: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null | undefined>(
    null,
  );

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    const { error } = await authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
        image: "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
      },
    );

    setIsLoading(false);

    if (error) {
      console.error("error Better auth: ", error);
      setGlobalError(error.statusText);
      reset();
      return;
    }

    router.push("/");
  };

  return (
    <PageContainer>
      <FormBasicLayout
        onSubmit={handleSubmit(onSubmit)}
        formTitle="Inscription"
      >
        <FormInputField
          id="name"
          label="Nom d'utilisateur"
          register={register("name")}
          error={errors.name?.message}
          type="text"
        />
        <FormInputField
          id="email"
          label="Email"
          register={register("email")}
          error={errors.email?.message}
          type="email"
        />
        <FormInputField
          id="password"
          label="Mot de passe"
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
          submitText="Inscription"
          isSubmiting={isLoading}
        />
      </FormBasicLayout>
    </PageContainer>
  );
}
