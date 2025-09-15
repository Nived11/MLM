import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const RebirthUsersSearch = () => {
  return (
    <div className="bg-background text-foreground flex items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
          Rebirth Users
        </h2>

        <div className="rounded-2xl p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-2xl bg-background p-4 sm:p-6 md:p-8">
            <h3 className="font-medium text-lg sm:text-xl mb-2">
              Search Rebirth Users
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white font-light mb-4 sm:mb-6">
              Users who have completed all levels and are re-entered at the starting level.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6 w-full">
              <div className="w-full sm:max-w-[500px]">
                <div className="rounded-xl p-[1px] w-full h-[42px] sm:h-[48px] md:h-[50px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Search by username"
                    type="text"
                    className="w-full h-full rounded-xl bg-background text-white text-sm sm:text-base font-light border-0 focus-visible:ring-ring/50 focus-visible:ring-2" />
                </div>
              </div>

              <Button
                className="w-full sm:w-[150px] h-[42px] sm:h-[48px] md:h-[50px] rounded-xl bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-sm sm:text-base font-semibold">
                Search
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                className="w-full sm:w-[260px] h-[42px] sm:h-[48px] md:h-[50px] rounded-xl bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-sm sm:text-base font-semibold">
                View all rebirth users
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebirthUsersSearch;
