import styles from "./Input.module.css";

interface PropsType {
  label?: string;
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const Input = (props: PropsType) => {
  const {
    label,
    name,
    id,
    type = "text",
    placeholder,
    required = false,
    className,
  } = props;

  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${className}`}
      />
    </label>
  );
};

export default Input;
