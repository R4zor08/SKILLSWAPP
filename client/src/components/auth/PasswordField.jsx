import { useId, useState } from 'react';

function IconEye() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/**
 * Password input with show/hide toggle (Login / Register).
 */
export function PasswordField({
  name = 'password',
  autoComplete = 'current-password',
  minLength,
  required = true,
  defaultValue,
  id: idProp,
}) {
  const uid = useId();
  const inputId = idProp || `pw-${uid}`;
  const [visible, setVisible] = useState(false);

  return (
    <label className="field full" htmlFor={inputId}>
      <span>Password</span>
      <div className="field-password-wrap">
        <input
          id={inputId}
          className="input input--password-toggle"
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          minLength={minLength}
          required={required}
          defaultValue={defaultValue}
        />
        <button
          type="button"
          className="field-password-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </label>
  );
}
