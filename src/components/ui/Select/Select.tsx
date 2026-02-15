import styles from "./Select.module.css";

interface OptionType {
  value: string;
  label: string;
}

interface PropsType {
  label?: string;
  name: string;
  id: string;
  required?: boolean;
  className?: string;
  options: OptionType[];
}

const Select = (props: PropsType) => {
  const { label, name, id, required = false, className, options } = props;

  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <select
        id={id}
        name={name}
        required={required}
        className={`${styles.select} ${className}`}
      >
        {options.map((option: OptionType) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
