export default function Input({
  label,
  name,
  register,
  errors = {},
  required = false,
  type = "text",
  placeholder = "",
  maxLength,
  disabled = false,
  readOnly = false,
  validation = {},
  onChange,
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2">
        <div className="font-semibold text-gray-800">
          {label.label}

          {required && <span className="text-red-500 ml-1">*</span>}
        </div>

        {label.subLabel && (
          <div className="text-xs text-gray-500">{label.subLabel}</div>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        {...register(name, {
          required: required ? `${label.subLabel} is required` : false,
          ...validation,
          onChange,
        })}
        className={`w-full rounded-lg border px-4 py-3 ${
          errors?.[name] ? "border-red-500" : "border-gray-300"
        } focus:border-green-700 outline-none`}
      />

      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
}
