function ListTitleContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex h-fit justify-center items-center gap-x-1 p-1 bg-primary rounded-3xl">
      {children}
    </div>
  );
}

export default ListTitleContainer;
