import type { ChangeEvent, FocusEvent, HTMLInputTypeAttribute, MutableRefObject } from "react";
import type { IconType } from "react-icons/lib";
import { InputRef } from "../app/register/[slug]/page";

import styles from "./../styles/modules/InputSection.module.scss";

export interface Props {
  state: string;
  name: string;
  label: string;
  Icon: IconType;
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
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = props;

  return (
    <section className={styles.input_section}>
      <Icon className={styles.svg_icon} />
      <div className={styles.styled_input}>
        <input
          type={type}
          name={name}
          value={state}
          className={`input-field spacedout-field ${state.length > 0 ? "input-field--active" : ""}`}
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
