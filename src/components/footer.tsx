import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-4 text-center text-sm">
        <p>&copy; {currentYear} Partha Pratim Mallick. All rights reserved.</p>
      </div>
    </footer>
  );
}
