import React from "react";
import { cn } from "./utils";

export interface TypographyProps {
  children: React.ReactNode;
  variant?:
    | "display-2xl"
    | "display-xl"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body-xl"
    | "body-lg"
    | "body-sm"
    | "caption"
    | "overline";
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  // Display
  "display-2xl": "text-[28px] sm:text-[32px] md:text-[35px] lg:text-[38px] font-bold",
  "display-xl": "text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold",

  // Headings
  h1: "text-[22px] sm:text-[23px] md:text-[24px] lg:text-[25px] font-semibold",
  h2: "text-[20px] sm:text-[21px] md:text-[22px] lg:text-[25px] font-semibold",
  h3: "text-[18px] sm:text-[19px] md:text-[19px] lg:text-[20px] font-medium",
  h4: "text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-medium",

  // Body
  "body-xl": "text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]",
  "body-lg": "text-[14px] sm:text-[14px] md:text-[15px] lg:text-[15px]",
  "body-sm": "text-[12px]",

  // Special
  caption: "text-[11px] uppercase tracking-wider",
  overline: "text-[10px] uppercase tracking-widest",
};

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body-lg",
  className,
  style,
}) => {
  const baseStyles = "font-sans text-inherit"; // ✅ FIXED

  const variantClass = variantStyles[variant];

  const getTag = () => {
    if (
      variant === "display-2xl" ||
      variant === "display-xl" ||
      variant === "h1" ||
      variant === "h2" ||
      variant === "h3" ||
      variant === "h4"
    ) {
      return variant === "display-2xl" || variant === "display-xl"
        ? "h1"
        : variant;
    }
    return variant === "caption" || variant === "overline" ? "span" : "p";
  };

  const elementProps: any = {
    className: cn(baseStyles, variantClass, className),
    style,
  };

  return React.createElement(getTag(), elementProps, children);
};

export default Typography;