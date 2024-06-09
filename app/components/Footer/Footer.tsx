import React from 'react';

export interface FooterProps {
  prop?: string;
}

export function Footer({ prop = 'default value' }: FooterProps) {
  return <footer className="flex items-center justify-center text-center border-t-2 border-pink-300 py-2 text-gray-500 w-[80%] mx-auto">
    &copy; {new Date().getFullYear()} Cat Help
  </footer>;
}
