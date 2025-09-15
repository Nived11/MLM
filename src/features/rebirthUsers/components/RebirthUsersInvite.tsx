import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const RebirthUsersInvite = () => {
  return (
    <div className="bg-background text-foreground flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Rebirth Users
        </h2>

        <div className="rounded-2xl p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-2xl bg-background p-4 sm:p-6 md:p-8">
            <h3 className="font-medium text-lg sm:text-xl mb-2">
              Invite New Rebirth User
            </h3>
            <p className="text-sm sm:text-base text-white font-light mb-4 sm:mb-6">
              New rebirth users will restart at Level 1.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 justify-items-center">
              <div className="w-full flex flex-col">
                <label className="block text-sm sm:text-base text-white font-light mb-1 sm:mb-2">
                  First Name
                </label>
                <div className="rounded-lg p-[1px] w-full max-w-[447px] h-[40px] sm:h-[46px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="First Name"
                    className="w-full h-full font-light text-sm sm:text-base rounded-lg bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-2"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-sm sm:text-base text-white font-light mb-1 sm:mb-2">
                  Last Name
                </label>
                <div className="rounded-lg p-[1px] w-full max-w-[447px] h-[40px] sm:h-[46px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Last Name"
                    className="w-full h-full font-light text-sm sm:text-base rounded-lg bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-2"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-sm sm:text-base text-white font-light mb-1 sm:mb-2">
                  Email Address
                </label>
                <div className="rounded-lg p-[1px] w-full max-w-[447px] h-[40px] sm:h-[46px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="w-full h-full font-light text-sm sm:text-base rounded-lg bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-2"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-sm sm:text-base text-white font-light mb-1 sm:mb-2">
                  Phone Number
                </label>
                <div className="rounded-lg p-[1px] w-full max-w-[447px] h-[40px] sm:h-[46px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full h-full font-light text-sm sm:text-base rounded-lg bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-2"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-sm sm:text-base text-white font-light mb-1 sm:mb-2">
                  Whatsapp Number
                </label>
                <div className="rounded-lg p-[1px] w-full max-w-[447px] h-[40px] sm:h-[46px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Whatsapp Number"
                    type="tel"
                    className="w-full h-full font-light text-sm sm:text-base rounded-lg bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-2"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-sm sm:text-base text-white font-light mb-1 sm:mb-2">
                  Pincode
                </label>
                <div className="rounded-lg p-[1px] w-full max-w-[447px] h-[40px] sm:h-[46px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Pincode"
                    type="number"
                    className="w-full h-full font-light text-sm sm:text-base rounded-lg bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-2"/>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
              <Button
                className="w-full sm:w-[230px] h-[42px] sm:h-[46px] rounded-lg bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-sm sm:text-base font-semibold">
                Invite New Users
              </Button>

              <Button
                className="w-full sm:w-[230px] h-[42px] sm:h-[46px] rounded-lg bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-sm sm:text-base font-semibold">
                Create Rebirth User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebirthUsersInvite;
