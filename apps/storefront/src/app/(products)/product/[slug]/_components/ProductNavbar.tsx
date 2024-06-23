import ScrollToSectionButton from "~/components/ui/scrollToSectionButton";
import ScrollToTopButton from "~/components/ui/scrollToTopButton";
import { useActiveSection } from "~/contexts/ActiveSectionContext";
import { cn } from "~/lib/utils";

const ProductNavbar = () => {
  const PRODUCT_NAVBAR_MOCKUP = [
    { type: "x", name: "Promocja" },
    { type: "description", name: "Opis" },
    { type: "specification", name: "Specyfikacja" },
    { type: "x", name: "Akcesoria" },
    { type: "x", name: "Opinie" },
    { type: "x", name: "Pytania i odpowiedzi" },
  ];

  const { activeSection } = useActiveSection();

  return (
    <nav className="shadow-custom-sm sticky top-0 z-[4] ml-[calc(50%-50vw)] mt-6 h-12 w-screen bg-white before:absolute before:top-14 before:z-[-1] before:block before:h-12 before:w-screen">
      <div className="m-auto flex flex-row items-center xl:w-[calc(100%-64px)] xl:max-w-[1156px]">
        <div className="flex h-12 flex-row items-center">
          <ScrollToTopButton>
            <span className="cursor-pointer md:mx-3">Icon</span>
          </ScrollToTopButton>
          {PRODUCT_NAVBAR_MOCKUP.map((item, index) => {
            return (
              <div
                className={cn(
                  "underline-indicator relative flex h-full items-center md:mx-3 ",
                  {
                    "underline-indicator-active ": activeSection == item.type,
                  },
                )}
              >
                <ScrollToSectionButton
                  sectionId={item.type.toLowerCase().replace(/ /g, "-")}
                >
                  <span
                    className={cn(
                      "cursor-pointer text-xs text-gray-400 md:text-sm",
                    )}
                  >
                    {item.name}
                  </span>
                </ScrollToSectionButton>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ProductNavbar;
