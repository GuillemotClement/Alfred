import { UseFormRegisterReturn } from "react-hook-form";

type FormInputNumberField = {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  optional?: string;
  step?: number;
};

const FormInputNumberField = ({
  label,
  id,
  register,
  error,
  placeholder = "",
  step,
  optional,
}: FormInputNumberField) => {
  return (
    <fieldset className="fieldset">
      <label className="fieldset-legend" htmlFor={id}>
        {label}
      </label>
      <input
        type="number"
        step={step}
        className={`w-full shadow input ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        {...register}
      />
      {optional && <div className="label">{optional}</div>}
      {error && (
        <p className="italic text-xs text-red-500 text-center">{error}</p>
      )}
    </fieldset>
  );
};

export default FormInputNumberField;
