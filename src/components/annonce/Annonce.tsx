import { annonce, softAnnonce } from "@tailus/themer-annonce";
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const variantsMap = {
  outlined: annonce,
  soft: softAnnonce
}

const colorsMap = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  accent: "accent",
  gray: "gray",
  neutral: "neutral"
}

const annonceVariants = cva([''], {
  variants: {
    variant: variantsMap ,
    colorVariant: colorsMap,
  },
  defaultVariants: {
    variant: 'outlined',
    colorVariant: 'primary',
  }
  });

export interface AnnonceProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof annonceVariants> {
  message: string;
  concern: string;
  href?: string;
}

export const Annonce: React.FC<AnnonceProps> = ({
    className,
    variant,
    colorVariant,
    concern,
    message,
    href,
    ...props
  }) => {
   
    const annonceUtilities = variantsMap[variant!].root
    const classes = cn(annonceVariants({ className }), annonceUtilities);
    return(
        <>
        {
          href ? (
            <a href={href} className={classes} {...props}>
              <span className={variantsMap[variant!]['concern'][colorVariant!]}>{concern}</span>
              <span className={variantsMap[variant!]['message']}>{message}</span>
            </a>
          ) : (
            <div className={classes} {...props}>

              <span className={variantsMap[variant!]['concern'][colorVariant!]}>{concern}</span>
              <span className={variantsMap[variant!]['message']}>{message}</span>
            </div>
          )
        }
        </>
    )
  }

