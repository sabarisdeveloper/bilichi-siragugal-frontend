export default function RadioGroup({
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

      <div className="flex gap-6 mt-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value={option.value}
              {...register(name, {
                required: required
                  ? `${label.subLabel || label.label} is required`
                  : false,
              })}
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}