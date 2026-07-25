interface Props {
  password: string;
}

export function PasswordStrength({ password }: Props) {
  let label = "Weak";

  let width = "33%";

  if (password.length >= 8) {
    label = "Medium";

    width = "66%";
  }

  if (password.length >= 12 && /\d/.test(password) && /[A-Z]/.test(password)) {
    label = "Strong";

    width = "100%";
  }

  return (
    <div className="space-y-2">
      <div className="h-2 rounded bg-muted">
        <div
          className="h-2 rounded bg-green-500 transition-all"
          style={{
            width,
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Password Strength : {label}
      </p>
    </div>
  );
}
