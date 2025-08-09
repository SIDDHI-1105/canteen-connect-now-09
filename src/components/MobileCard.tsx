
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MobileCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const MobileCard = ({ 
  title, 
  description, 
  children, 
  className, 
  padding = 'md',
  hoverable = true 
}: MobileCardProps) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <Card className={cn(
      "bg-white/90 backdrop-blur border border-orange-200 rounded-xl",
      hoverable && "hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
      className
    )}>
      {(title || description) && (
        <CardHeader className={`${paddingClasses[padding]} pb-2`}>
          {title && (
            <CardTitle className="text-lg font-semibold text-gray-800">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-sm text-gray-600">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={cn(
        paddingClasses[padding],
        (title || description) && "pt-0"
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default MobileCard;
