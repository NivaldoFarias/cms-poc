import type {
  ChangeEvent,
  FocusEvent,
  HTMLInputTypeAttribute,
  MutableRefObject,
} from "react";
import type { IconType } from "react-icons/lib";

import styles from "./../styles/modules/InputSection.module.scss";

export interface Props {
  state: string;
  name: string;
  label: string;
  Icon: IconType;
  displayError: boolean;
  type: HTMLInputTypeAttribute;
  inputRef: MutableRefObject<Record<string, HTMLInputElement | null>>;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputFocus: (event: FocusEvent<HTMLInputElement>) => void;
  handleInputBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export default function InputSection(props: Props) {
  const {
    state,
    label,
    name,
    Icon,
    type,
    inputRef,
    displayError,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = props;

  return (
    <section className={styles.input_section}>
      <Icon
        className={displayError ? styles.svg_icon__error : styles.svg_icon}
      />
      <div className={styles.styled_input}>
        <input
          type={type}
          name={name}
          value={state}
          className={`input-field ${
            type === "password" || name === "cri" || name === "cnpj"
              ? "input-spacedout-field"
              : ""
          } ${state.length > 0 ? "input-field--active" : ""}`}
          ref={(element) => (inputRef.current[name] = element)}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          required
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className="label-text">{label}</label>
      </div>
    </section>
  );
}
