import Meta from "../../components/custom-ui/Meta";
import {ProfilePage}  from "../../features/Profile/components/ProfilePage";
import { ProfileButton } from "../../features/Profile/components/profilebutton";


export const ProfileDetails = () => {  
    return (
        <>
            <Meta page="Profile" />
            <div className="min-h-screen bg-black text-white p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-6">Profile</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                <ProfileButton />
                </div>
                <div className="md:col-span-2">
                <ProfilePage />
                </div>
            </div>
            </div>

        </>
    );
}
