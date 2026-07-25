interface Props {
  message: string;
}

export function SuccessAlert({ message }: Props) {
  return (
    <div
      className="
                rounded-lg
                border
                border-green-300
                bg-green-50
                px-4
                py-3
                text-sm
                text-green-700
            "
    >
      {message}
    </div>
  );
}
