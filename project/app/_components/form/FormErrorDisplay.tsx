export default function FormErrorDisplay({ error }: { error: string }) {
  return (
    <div className="italic text-xs text-red-500 text-center mb-5">{error}</div>
  );
}
