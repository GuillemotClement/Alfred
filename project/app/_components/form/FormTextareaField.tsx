import { UseFormRegisterReturn } from "react-hook-form";

type FormTextareaField = {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  optional?: string;
};

const FormTextareaField = ({
  label,
  id,
  optional,
  error,
  placeholder,
  register,
}: FormTextareaField) => {
  return (
    <fieldset className="fieldset w-full">
      <label className="fieldset-legend" htmlFor={id}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        id={id}
        className={`w-full shadow textarea h-24 ${error ? "input-error" : ""}`}
        {...register}
      ></textarea>
      {optional && <div className="label">{optional}</div>}
      {error && (
        <p className="italic text-xs text-red-500 text-center">{error}</p>
      )}
    </fieldset>
  );
};

export default FormTextareaField;
