import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-8 before:hidden before:bg-[url(/images/login.jpg)] before:bg-cover before:bg-center before:bg-no-repeat before:content-[''] md:grid-cols-2 md:before:block">
      <div className="max-w-full animate-left self-center p-4 md:max-w-[480px]">
        {children}
      </div>
    </div>
  );
}
