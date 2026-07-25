import { useNavigate } from "react-router-dom";

export function ServerErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      className="
            flex
            min-h-screen
            flex-col
            items-center
            justify-center
            gap-4
            "
    >
      <h1
        className="
                text-6xl
                font-bold
                "
      >
        500
      </h1>

      <h2
        className="
                text-2xl
                font-semibold
                "
      >
        Internal Server Error
      </h2>

      <p
        className="
                text-muted-foreground
                "
      >
        Something went wrong on our side.
      </p>

      <button
        onClick={() => navigate(0)}
        className="
                rounded-md
                bg-black
                px-5
                py-2
                text-white
                "
      >
        Retry
      </button>
    </div>
  );
}
