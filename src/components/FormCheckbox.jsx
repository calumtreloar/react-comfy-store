const FormCheckbox = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control items-center">
      <label className="label cursor-pointer" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        className={`checkbox checkbox-primary rounded-full ${size}`}
        name={name}
        defaultChecked={defaultValue}
      />
    </div>
  );
};

export default FormCheckbox;
