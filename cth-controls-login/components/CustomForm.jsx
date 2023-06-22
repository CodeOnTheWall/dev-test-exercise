export default function CustomForm({
  formFields,
  formLabelAndInputFields,
  canSaveParams,
  buttonInfo,
}) {
  const { error, formTitle } = formFields;

  // all have to be Boolean (true) for button to be clicked
  const canSave = canSaveParams.every(Boolean);

  return (
    <form
      className="flex flex-col items-center justify-center space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* aria-live monitors element for changes, and reads aloud as a screen reader,
        assertive will immediately announce updates */}
      <p className=" text-red-600" aria-live="assertive">
        {error}
      </p>
      <h1
        className="flex justify-center text-blue-700
    underline decoration-blue-700 underline-offset-4 font-bold
    text-3xl"
      >
        {formTitle}
      </h1>

      {formLabelAndInputFields.map((field) => (
        <div className=" space-x-5 " key={field.name}>
          <label key={field.name} htmlFor={field.name}>
            {field.label}
          </label>
          <input
            className=" border border-blue-500 rounded-md"
            ref={field.ref}
            type={field.type}
            id={field.name}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            // for security
            autoComplete="off"
            required={field.required}
          />
        </div>
      ))}

      {/* if more than 1 button */}
      {/* disabled is true if !canSave */}
      {buttonInfo.map((button, index) => (
        <button
          className={`${
            !canSave
              ? "opacity-50 cursor-not-allowed"
              : "text-white border border-blue-700 rounded-lg bg-blue-400 px-2"
          }`}
          key={index}
          disabled={!canSave}
          title={button.buttonTitle}
          onClick={button.onButtonClick}
        >
          {button.buttonTitle}
        </button>
      ))}
    </form>
  );
}