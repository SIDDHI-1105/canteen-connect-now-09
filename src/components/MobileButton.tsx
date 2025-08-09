
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const MobileButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className
}: MobileButtonProps) => {
  const variants = {
    primary: 'warm-gradient-coral text-white border-0 hover:opacity-90',
    secondary: 'warm-gradient-peach text-white border-0 hover:opacity-90',
    outline: 'border-2 border-orange-300 bg-white text-orange-700 hover:bg-orange-50',
    ghost: 'bg-transparent text-orange-700 hover:bg-orange-100'
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'mobile-tap-target font-semibold rounded-xl transition-all duration-200',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="h-5 w-5 mr-2" />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className="h-5 w-5 ml-2" />
      )}
    </Button>
  );
};

export default MobileButton;
