export default function Select({
  label,
  name,
  register,
  errors = {},
  options = [],
  required = false,
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2">
        <div className="font-semibold text-gray-800">
          {label.label}

          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </div>

        {label.subLabel && (
          <div className="text-xs text-gray-500">
            {label.subLabel}
          </div>
        )}
      </label>

      <select
        {...register(name, {
          required: required
            ? `${label.subLabel || label.label} is required`
            : false,
        })}
        className={`w-full rounded-lg border px-4 py-3 outline-none transition
          ${
            errors?.[name]
              ? "border-red-500"
              : "border-gray-300"
          }
          focus:border-green-700`}
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option
            key={option.value || option}
            value={option.value || option}
          >
            {option.label || option}
          </option>
        ))}
      </select>

      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}