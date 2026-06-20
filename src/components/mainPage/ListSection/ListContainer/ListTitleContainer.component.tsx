function ListTitleContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center items-center gap-x-1 bg-secondary p-1.5 gap-y-2 rounded-3xl">
			{children}
		</div>
	);
}

export default ListTitleContainer;
