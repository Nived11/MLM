import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const RebirthUsersInvite = () => {
  return (
    <div className="bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-2xl sm:text-xl font-semibold mb-4">Rebirth Users</h2>

        <div className="rounded-[20px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-[19px] bg-background p-6 sm:p-8 md:p-10">
            <h3 className="font-medium text-xl mb-2">Invite New Rebirth User</h3>
            <p className="text-base sm:text-lg text-white font-light mb-6">
              New rebirth users will restart at Level 1.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 justify-items-center">
              <div className="w-full flex flex-col">
                <label className="block text-base text-white font-light mb-2">
                  First Name
                </label>
                <div className="rounded-[7px] p-[1px] w-full max-w-[447px] h-[51px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="First Name"
                    className="w-full h-full font-light text-lg rounded-[7px] bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-base text-white font-light mb-2">
                  Last Name
                </label>
                <div className="rounded-[7px] p-[1px] w-full max-w-[447px] h-[51px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Last Name"
                    className="w-full h-full font-light text-lg rounded-[7px] bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-base text-white font-light mb-2">
                  Email Address
                </label>
                <div className="rounded-[7px] p-[1px] w-full max-w-[447px] h-[51px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="w-full h-full font-light text-lg rounded-[7px] bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]"/>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="block text-base text-white font-light mb-2 ">
                  Phone Number
                </label>
                <div className="rounded-[7px] p-[1px] w-full max-w-[447px] h-[51px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full h-full font-light text-lg rounded-[7px] bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]"/>
                </div>
              </div>

              <div className="w-full flex flex-col ">
                <label className="block text-base text-white font-light mb-2 ">
                  Whatsapp Number
                </label>
                <div className="rounded-[7px] p-[1px] w-full max-w-[447px] h-[51px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Whatsapp Number"
                    type="tel"
                    className="w-full h-full font-light text-lg rounded-[7px] bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]"/>
                </div>
              </div>

              <div className="w-full flex flex-col ">
                <label className="block text-base text-white font-light mb-2 ">
                  Pincode
                </label>
                <div className="rounded-[7px] p-[1px] w-full max-w-[447px] h-[51px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Pincode"
                    type="number"
                    className="w-full h-full font-light text-lg rounded-[7px] bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]"/>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-[273px] h-[53px] rounded-[13px] bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-base font-semibold">
                Invite New Users
              </Button>

              <Button
                size="lg"
                className="w-full sm:w-[273px] h-[53px] rounded-[13px] bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-base font-semibold">
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
