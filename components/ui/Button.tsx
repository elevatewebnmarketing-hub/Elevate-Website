'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-heading font-semibold rounded-xl transition-all duration-200 hover:shadow-md';
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 shadow-soft hover:shadow-soft-lg',
    secondary:
      'bg-primary text-white hover:bg-primary/90 shadow-soft hover:shadow-soft-lg',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white/50 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/70',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {buttonContent}
    </button>
  );
}
