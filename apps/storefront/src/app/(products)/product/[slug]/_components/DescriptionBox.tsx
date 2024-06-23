const DescriptionBox: React.FC = () => {
  const descriptionMockup = [
    { specification: "Procesor", description: "Intel® Celeron N4500" },
    { specification: "Pamięć", description: "8GB" },
    { specification: "Grafika", description: "Intel UHD Graphics" },
    { specification: "Typ Ekranu", description: "Matowy, LED, IPS" },
  ];

  return (
    <div className="min-w-[120px] flex-1 basis-0 max-md:hidden md:max-xl:mt-3 xl:pr-8">
      <ul className="border-t border-gray-200 pb-1 pr-8 pt-3">
        {descriptionMockup.map((spec) => (
          <li key={spec.specification} className="pb-2">
            <span className="mr-2 cursor-pointer text-xs text-gray-300 underline decoration-dotted">
              {spec.specification}:
            </span>
            <span className="text-xs">{spec.description}</span>
          </li>
        ))}
      </ul>
      <button className="rounded-lg px-2 py-[6px] text-xs text-gray-400 hover:bg-gray-200">
        Przewiń do pełnej specyfikacji
      </button>
    </div>
  );
};

export default DescriptionBox;
