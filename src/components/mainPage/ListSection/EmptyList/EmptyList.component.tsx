import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

function EmptyList() {
  const t: any = UseLangComponent("Selected");

  return (
    <div className="flex items-center justify-center rounded-2xl h-full">
      <span>{t.nothing}</span>
    </div>
  );
}

export default EmptyList;
