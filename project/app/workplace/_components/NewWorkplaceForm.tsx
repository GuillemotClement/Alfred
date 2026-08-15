"use client";

import FormBasicLayout from "@/app/_components/form/FormBasicLayout";
import FormInputField from "@/app/_components/form/FormInputField";
import FormAction from "@/app/_components/form/FormAction";
import {
  CreateWorkplaceFormData,
  createWorkplaceSchema,
  WorkplaceCategorie,
} from "../_schema/workplace";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import FormSelectField from "@/app/_components/form/FormSelectField";
import { createWorkplace } from "../_actions/workplace";
import { useRouter } from "next/navigation";
import FormTextareaField from "@/app/_components/form/FormTextareaField";
import FormInputNumberField from "@/app/_components/form/FormInputNumberField";

type NewWorkPlaceForm = {
  categories: WorkplaceCategorie[];
};

const NewWorkPlaceForm = ({ categories }: NewWorkPlaceForm) => {
  const defaultValues = {
    name: "",
    street: "",
    city: "",
    image: "",
    categoryId: undefined,
    description: "",
    note: undefined,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWorkplaceFormData>({
    resolver: zodResolver(createWorkplaceSchema),
    mode: "onChange",
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null | undefined>(
    null,
  );

  const router = useRouter();

  const onSubmit = async (data: CreateWorkplaceFormData) => {
    setIsLoading(true);
    const result = await createWorkplace(data);
    setIsLoading(false);
    console.log("result on component form: ", result);

    if (!result.success) {
      setGlobalError(result.error);
    }

    router.push("/workplace");
  };

  return (
    <FormBasicLayout
      onSubmit={handleSubmit(onSubmit)}
      formTitle="Nouvel Etablissement"
    >
      <FormInputField
        id="name"
        label="Nom"
        register={register("name")}
        error={errors.name?.message}
        type="text"
        placeholder="Résidence des Fontaines"
      />
      <FormInputField
        id="street"
        label="Rue"
        register={register("street")}
        error={errors.street?.message}
        type="text"
        placeholder="5 Rue Saint-Laurent"
      />
      <FormInputField
        id="city"
        label="Ville"
        register={register("city")}
        error={errors.city?.message}
        type="text"
        placeholder="Melrand"
      />
      <FormSelectField
        label="Catégorie"
        id="categoryId"
        register={register("categoryId", { valueAsNumber: true })}
        error={errors.categoryId?.message}
        items={categories}
        textValueDefault="Sélectionner une catégorie"
      />

      <FormTextareaField
        id="description"
        label="Commentaire"
        register={register("description")}
        error={errors.description?.message}
        optional=""
        placeholder="Code d'accès 0000, entrée de service à l'arrière du batiment."
      />

      <FormInputNumberField
        id="note"
        label="Note"
        register={register("note", { valueAsNumber: true })}
        error={errors.note?.message}
        optional=""
        placeholder="5"
        step={1}
      />

      {globalError && (
        <p className="italic text-xs text-red-500 text-center mb-5 font-bold">
          {globalError}
        </p>
      )}

      <FormAction reset={reset} submitText="Créer" isSubmiting={isLoading} />
    </FormBasicLayout>
  );
};

export default NewWorkPlaceForm;
