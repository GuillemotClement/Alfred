import { UseFormRegisterReturn } from "react-hook-form";

type FormInputField = {
  label: string;
  id: string;
  type?: Type;
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
};

type Type = "text" | "email" | "email" | "number" | "password";

export default function FormInputField({
  label,
  id,
  register,
  error,
  type = "text",
  placeholder = "",
}: FormInputField) {
  return (
    <fieldset className="fieldset my-3">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`w-full shadow input ${error ? "input-error" : ""}`}
        {...register}
      />
      {error && (
        <p className="italic text-xs text-red-500 text-center">{error}</p>
      )}
    </fieldset>
  );
}
