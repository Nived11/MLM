import { Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="relative flex items-center justify-end bg-black px-6 py-4 shadow-md">
    

      {/* Right Side Icons */}
      <div className="flex items-center space-x-6">
        {/* Bell Icon */}
        <Bell className="w-5 h-5 text-white hover:text-white-500 cursor-pointer" />

        {/* Profile Icon inside Circle */}
        <div className="w-5 h-5 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center cursor-pointer">
          <User className="w-6 h-6 text-gray-300" />
        </div>
      </div>
    </header>
  );
}
