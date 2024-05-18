import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./styles.module.css";
import InputField from "../../components/InputField";

type FormValues = { email: string; password: string };

const Signup: FC = () => {
  const [state, setState] = useState<FormValues>({ email: "", password: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validation = {
    email: [
      {
        label: /\S+@\S+\.\S+/.test(state.email) ? "" : "Field should a valid email",
        condition: /\S+@\S+\.\S+/.test(state.email),
        id: 0,
      },
    ],
    password: [
      { label: "8 characters or more", condition: state.password.length >= 8, id: 0 },
      {
        label: "Uppercase and lowercase letters",
        condition: /[A-Z]/.test(state.password) && /[a-z]/.test(state.password),
        id: 1,
      },
      { label: "At least one digit", condition: /\d/.test(state.password), id: 2 },
    ],
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (validation.email.every((el) => el.condition) && validation.password.every((el) => el.condition))
      window.alert("Successful sign up");
  };

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFormSubmitted(false);
    setState({ ...state, [name]: value });
  };

  return (
    <form noValidate onSubmit={onSubmit} className={styles.container} aria-label="Sign up form">
      <div className={styles.form}>
        <h2 className={styles.title}>Sign up</h2>
        <div className={styles.inputs}>
          <InputField
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Enter your email"
            aria-label="Email input"
            showMessages={formSubmitted}
            validation={validation.email}
            submitted={formSubmitted}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Create your password"
            aria-label="Password input"
            onChange={handleChange}
            value={state.password}
            validation={validation.password}
            showMessages
            submitted={formSubmitted}
          />
        </div>
        <button type="submit" className={styles.submitButton} aria-label="Submit sign up form">
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Signup;
