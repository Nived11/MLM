import { useProfile } from "../hooks/profile";
import MyImage from "../../../assets/images/fake.png";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const { profile, profile_image, menuItems } = useProfile();
  const navigate = useNavigate();

  if (!profile) return null;

  // Nested routes under /profile
  const routes: Record<string, string> = {
    Profile: "/profile",
    Account: "/profile/account",
    KYC: "/profile/kyc",
    Security: "/profile/security",
    "Referral Link": "/profile/referral",
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-80">
      {/* Profile Card */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg w-full">
        <div className="bg-black p-6 rounded-2xl flex flex-col items-center">
          {/* Profile Image with Gradient Border */}
          <div className="relative w-40 h-40 rounded-full p-[2px] bg-gradient-to-r from-purple-1 to-purple-2 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              {profile_image ? (
                <img
                  src={profile_image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={MyImage}
                  alt="Default"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Profile Info */}
          <p className="mt-4 text-lg font-bold">{profile.id}</p>
          <p className="text-sm text-gray-400 uppercase">{profile.level}</p>
        </div>
      </div>

      {/* Menu Card */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg w-full">
        <div className="bg-black p-6 rounded-2xl flex flex-col items-center">
          <div className="w-full my-6" />

          {/* Menu Buttons */}
          <div className="mt-6 flex flex-col w-full space-y-3">
            {menuItems.map((item) => (
              <Button
                key={item}
                onClick={() => routes[item] && navigate(routes[item])}
                className="py-2 rounded-md font-semibold transition text-white w-full 
                           bg-gradient-to-r from-blue-1 to-blue-2 
                           hover:from-purple-1 hover:to-purple-2 shadow-md"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
