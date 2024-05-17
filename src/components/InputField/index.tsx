import { FC, InputHTMLAttributes, useState } from "react";
import styles from "./styles.module.css";
import eye from "../../assets/eye.svg";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  validation?: {
    label: string;
    condition: boolean;
  }[];
  showMessages?: boolean;
  submitted: boolean;
}

const InputField: FC<IProps> = ({ type, validation, showMessages, submitted, ...props }) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className={styles.wrapper}>
      <input
        {...props}
        type={inputType}
        className={`${styles.input} ${
          validation?.every((el) => el.condition) && submitted ? styles.success : submitted ? styles.error : ""
        }`}
      />
      {type === "password" && <img className={styles.toggler} src={eye} onClick={togglePasswordVisibility} />}
      {showMessages && (
        <div
          style={{ display: validation?.every((el) => el.label) ? "flex" : "none" }}
          className={styles.inputFeedback}
        >
          {validation?.map(
            (el) =>
              el.label && (
                <span style={{ color: el.condition ? "var(--green)" : submitted ? "var(--red)" : "" }}>{el.label}</span>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
