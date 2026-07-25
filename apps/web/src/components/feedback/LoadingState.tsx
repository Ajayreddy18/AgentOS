type Props = {
  text?: string;
};

export function LoadingState({ text = "Loading..." }: Props) {
  return (
    <div className="flex justify-center py-20">
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
