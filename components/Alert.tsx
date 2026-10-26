import type { CSSProperties, ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
  background?: string;
  color?: string;
  borderColor?: string;
  className?: string;
};

export default function Alert({
  children,
  background = "#e6f7f5",
  color = "#007c77",
  borderColor = "#009d91",
  className = "",
}: AlertProps) {
  const style = {
    "--alert-bg": background,
    "--alert-color": color,
    "--alert-border": borderColor,
  } as CSSProperties;

  return (
    <div
      role="alert"
      className={`alert ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}