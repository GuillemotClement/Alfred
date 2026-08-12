import Loader from "../ui/Loader";

type FormAction = {
  submitText: string;
  resetText?: string;
  reset: () => void;
  isSubmiting?: boolean;
};

export default function FormAction({
  submitText,
  resetText = "Vider",
  reset,
  isSubmiting = false,
}: FormAction) {
  return (
    <div className="flex gap-x-5 justify-center my-5">
      <button className="btn btn-neutral" type="reset" onClick={reset}>
        {resetText}
      </button>
      <button className="btn btn-primary" type="submit">
        {isSubmiting ? <Loader /> : submitText}
      </button>
    </div>
  );
}
