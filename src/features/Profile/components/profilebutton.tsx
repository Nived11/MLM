import { useProfile } from "../hooks/profile";
import MyImage from "../../../assets/images/fake.png";
import { Button } from "../../../components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { FormSkeleton } from "./FormSkelton";

export const ProfileButton = () => {
  const { editableProfile, loading, error, profile_image } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  const routes: Record<string, string> = {
    Profile: "/profile",
    Account: "/profile/account",
    KYC: "/profile/kyc",
    Security: "/profile/security",
    "Referral Link": "/profile/referral",
  };

  const menuItems = Object.keys(routes);

  if (loading) {
    return <FormSkeleton/>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-sm mx-auto">
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg w-full">
        <div className="bg-black p-6 rounded-2xl flex flex-col items-center">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[2px] bg-gradient-to-r from-purple-1 to-purple-2 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img
                src={profile_image || MyImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="mt-4 text-lg font-bold">
            {editableProfile?.user_id || "Unknown ID"}
          </p>
          <p className="text-sm text-gray-400 uppercase">
          Level 1
          </p>
        </div>
      </div>
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg w-full">
        <div className="bg-black p-6 rounded-2xl flex flex-col items-center space-y-4">
          {menuItems.map((item) => {
            const path = routes[item];
            const isActive = location.pathname === path; 

            return (
              <Button
                key={item}
                onClick={() => navigate(path)}
                className={`py-2 rounded-md font-semibold w-full transition shadow-md 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-1 to-purple-2 text-white"
                      : "bg-gradient-to-r from-blue-1 to-blue-2 text-white hover:from-purple-1 hover:to-purple-2"
                  }`}
              >
                {item}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
