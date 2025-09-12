import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const RebirthUsersSearch = () => {
  return (
    <div className="bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Rebirth Users</h2>

        <div className="rounded-[20px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-[19px] bg-background p-6 sm:p-8 md:p-10">
            <h3 className="font-medium text-xl mb-2">Search Rebirth Users</h3>
            <p className="text-sm sm:text-base text-white font-light mb-6">
              Users who have completed all levels and are re-entered at the starting level.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center mb-6 w-full">
              <div className="w-full max-w-[633px]">
                <div className="rounded-[13px] p-[1px] w-full h-[53px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Search by username"
                    type="text"
                    className="w-full h-full rounded-[13px] bg-background text-white text-base font-light border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </div>
              </div>
              <Button
                size="lg"
                className="w-full sm:w-[174px] h-[53px] rounded-[13px] bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-base font-semibold"
              >
                Search
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="w-full sm:w-[319px] h-[53px] rounded-[13px] bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-base font-semibold"
              >
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
