"use client";

function PageContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full lg:w-2/3 m-auto 
    bg-[linear-gradient(135deg,_#1e3c72_0%,_#2a5298_25%,_#667eea_50%,_#764ba2_75%,_#f093fb_100%)] 
    flex flex-col h-[calc(100vh-5rem)] sm:h-[calc(100vh-7rem)]"
    >
      <div className="w-full text-center p-3">{title}</div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 h-full flex-1 relative">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
