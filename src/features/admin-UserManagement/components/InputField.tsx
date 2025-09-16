import { Input } from "../../../components/ui/input";

interface InputFieldProps {
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}
const InputField = ({
  label,
  value,
  error,
  disabled,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-400 mb-1 text-xs md:text-sm  lg:text-sm">
        {label}
      </label>

      <div
        className={`p-[1px] rounded-md ${
          error
            ? "border border-red-500"
            : disabled
            ? "border border-violet-600"
            : "bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]"
        }`}
      >
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={label}
          className={`w-full p-3 bg-black rounded-md border ${
            error ? "border-red-500" : "border-gray-700"
          } focus:outline-none focus:ring-2 focus:ring-purple-1 disabled:opacity-50`}
        />
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputField;
