import React from 'react';
import Navigation from './navigation';
import { cn } from "@/lib/utils";


interface HeaderProps {
    className?: string;
  }
  
  const Header = ({ className }: HeaderProps) => {
    return (
      <header className={cn("w-full ", className)}>
        <div className="container mx-auto px-4 " >
          <Navigation />
        </div>
      </header>
    );
  };
  
  export default Header;