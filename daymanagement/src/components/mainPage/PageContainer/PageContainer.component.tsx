"use client";

function PageContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-7rem)]">
      <div className="w-full text-center border-b p-3">{title}</div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 h-full flex-1 relative">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
