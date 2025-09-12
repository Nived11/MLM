import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Header from "./header";
import ProfileButton from "./profilebutton";

export default function SecuritySettings() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <h2 className="text-2xl font-semibold mt-6 mb-4 px-6 text-white">Profile</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-6 py-8">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <ProfileButton />
        </div> 

        {/* Right Form */}
        <div className="md:col-span-2 border border-purple-600 rounded-lg p-6 bg-black">
          {/* Title */}
          <h2 className="text-xl font-medium mb-6 text-white">Security Settings</h2>           

          {/* Form Fields */}
          <div className="flex flex-col space-y-4">
            {/* Current Password */}
            <div className="flex flex-col">
              <label className="block text-sm text-gray-300 mb-2">Current Password</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  type="password"   
                  placeholder="Enter current password"
                  className="w-full bg-black border-0 rounded-md px-4 py-3 placeholder-gray-400 text-white"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="flex flex-col">
              <label className="block text-sm text-gray-300 mb-2">New Password</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full bg-black border-0 rounded-md px-4 py-3 placeholder-gray-400 text-white"
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col">
              <label className="block text-sm text-gray-300 mb-2">Confirm New Password</label>      
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full bg-black border-0 rounded-md px-4 py-3 placeholder-gray-400 text-white"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">  
            <Button className="px-8 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-purple-1 to-purple-2 hover:opacity-90 transition">
              Save    
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
