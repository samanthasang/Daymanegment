function ListTitleContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center items-center gap-x-1 p-1 bg-primary rounded-full">
      {children}
    </div>
  );
}

export default ListTitleContainer;
