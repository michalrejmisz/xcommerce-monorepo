import { cn } from "~/lib/utils";

const SpecificationSection = () => {
  return (
    <div className="mt-9">
      <div className="separator flex" />
      <h2 className="font-instrument  mb-6 mt-2 text-2xl -tracking-[0.13px]">
        Specyfikacja
      </h2>
      <div>
        {Array.from({ length: 10 }, (_, index) => index + 1).map(
          (item, index) => {
            return (
              <div
                className={cn("flex flex-row p-2 hover:bg-gray-200", {
                  "bg-gray-100": index % 2 === 0,
                })}
              >
                <div className="box-border w-1/3 px-2 sm:w-5/12  md:ml-[16.66%] md:w-1/4 md:px-3 lg:px-4">
                  <div className="  text-sm font-semibold -tracking-[0.06px] text-gray-500">
                    Procesor:
                  </div>
                </div>
                <div className=" w-2/3 sm:w-7/12 md:w-5/12">
                  <div className="px-2 text-sm -tracking-[0.06px] text-gray-500  md:px-3 lg:px-4">
                    Intel® Celeron N4500
                  </div>
                </div>
              </div>
            );
          },
        )}
        <div
          className={cn("flex flex-row p-2 hover:bg-gray-200", {
            "bg-gray-100": true,
          })}
        >
          <div className="box-border w-1/3 px-2 sm:w-5/12  md:ml-[16.66%] md:w-1/4 md:px-3 lg:px-4">
            <div className="  text-sm font-semibold -tracking-[0.06px] text-gray-500">
              Procesor:
            </div>
          </div>
          <div className=" w-2/3 sm:w-7/12 md:w-5/12">
            <div className="px-2 text-sm -tracking-[0.06px] text-gray-500  md:px-3 lg:px-4">
              Intel® Core™ i5-1235U (10 rdzeni, 12 wątków, 3.30-4.40 GHz, 12MB
              cache)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificationSection;
