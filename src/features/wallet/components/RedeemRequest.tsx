import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const RedeemRequest = () => {
  return (
    <div className="bg-background text-foreground flex items-center justify-center px-4 pt-6 sm:pt-8 md:pt-10">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Club Wallet Redeem Request
        </h2>

        <div className="rounded-2xl p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-2xl bg-background p-4 sm:p-6 md:p-8">
            <h3 className="font-medium text-lg sm:text-xl mb-2">
              Redeem Request
            </h3>
            <p className="font-light text-sm sm:text-base mb-4 sm:mb-6">
              Please enter the amount you wish to redeem from your club wallet. Our
              team will review and process your request.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4 sm:mb-6">
              <div>
                <label className="block text-sm sm:text-base font-light mb-1 sm:mb-2">
                  Amount :
                </label>
                <div className="rounded-xl p-[1px] w-full max-w-[447px] [background:linear-gradient(90deg,#6A00D4_0%,#FFFFFF_100%)]">
                  <Input
                    placeholder="$"
                    type="number"
                    className="w-full text-sm sm:text-base font-light rounded-xl bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-2"/>
                </div>
              </div>

              <div className="flex flex-col gap-1 sm:gap-2 text-sm sm:text-base font-light sm:items-end">
                <p>
                  Transaction Fee: <span className="font-medium">0</span>
                </p>
                <p>
                  Wallet Balance: <span className="font-medium">0</span>
                </p>
              </div>
            </div>

            <Button
              variant="default"
              className="bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2 rounded-md">
              Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemRequest;
