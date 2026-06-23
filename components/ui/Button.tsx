import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "soft" | "gold";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium " +
  "transition-[transform,background-color,color,box-shadow] duration-[250ms] ease-calm " +
  "focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none active:scale-[0.985]";

const variants: Record<Variant, string> = {
  primary: "bg-rosa-600 text-cream hover:bg-rosa-700 shadow-calm",
  gold: "bg-gold text-ink hover:bg-gold-deep hover:text-cream shadow-calm",
  soft: "bg-rosa-50 text-rosa-700 hover:bg-rosa-100",
  ghost: "text-ink-soft hover:text-ink hover:bg-rosa-50",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

function cx(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ");
}

export const Button = forwardRef<
  HTMLButtonElement,
  CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ variant = "primary", size = "md", className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
