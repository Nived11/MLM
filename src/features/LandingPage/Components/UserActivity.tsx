import { User2 as UserIcon, PieChart as PieIcon } from "lucide-react";
import chart from "../../../assets/images/chart.png";
import profile from "../../../assets/images/profile.png";
const requests = [
    { id: "LX75082", status: "Approved" },
    { id: "LX75082", status: "Processing" },
    { id: "LX75082", status: "Processing" },
    { id: "LX75082", status: "Approved" },
    { id: "LX75082", status: "Processing" },
    { id: "LX75082", status: "Approved" },
    { id: "LX75082", status: "Processing" },
    { id: "LX75082", status: "Processing" },
];

const UserActivity = () => {
    return (
        <div className="lg:mt-3 p-4 pb-0 sm:p-4 lg:p-6 pt-0 mr-4 sm:mr-12">
            <section className="bg-gradient-to-br to-blue-2 from-blue-1 rounded-3xl p-4 sm:p-8 flex flex-col gap-10  mb-5 ">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 lg:gap-18 pl-2 pt-4 sm:pl-5">
                        <div className="flex flex-col items-center items-start sm:items-start w-full sm:w-auto">
                            <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 mb-6 sm:mb-10 lg:mb-13">
                                <img
                                    src={profile}
                                    alt="profile image"
                                    className="w-15 h-15 sm:w-20 sm:h-20 lg:w-22 lg:h-22 object-cover"
                                />
                            </div>
                            <div className="flex flex-row sm:flex-row gap-1 sm:gap-6 lg:gap-15">
                                <UserIcon className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                <span className="text-white text-base sm:text-xl lg:text-2xl font-semibold">LX88011</span>
                                <span className="text-white text-base sm:text-xl lg:text-2xl font-semibold">
                                    DARALIKA V
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center sm:justify-start items-center">
                            <img
                                src={chart}
                                alt="Graph Chart"
                                className="w-full  max-w-[180px] sm:max-w-[320px] lg:max-w-[460px] ml-10 object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-full">
                    <div className="flex items-center gap-2 sm:gap-8 lg:gap-15 ml-2 sm:ml-6">
                        <PieIcon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                        <span className="text-white text-base sm:text-xl lg:text-2xl font-semibold">
                            Level Requests
                        </span>
                    </div>
                    <div className="pl-10 pr-5 sm:pl-6 md:pl-20 lg:pl-30 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 w-full">
                        {requests.map((req, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between xl:justify-start xl:gap-10 w-full"
                            >
                                <span className="text-white text-xs sm:text-base lg:text-lg font-light">
                                    {req.id}
                                </span>

                                {req.status === "Approved" ? (
                                    <span className="rounded-full px-3 sm:px-5 lg:px-6 py-1 sm:py-2 text-xs sm:text-sm lg:text-base font-light bg-gradient-to-l from-purple-2 to-purple-1 text-white text-center min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]">
                                        Approved
                                    </span>
                                ) : (
                                    <span className="rounded-full px-3 sm:px-5 lg:px-6 py-1 sm:py-2 text-xs sm:text-sm lg:text-base font-light border border-purple-500 text-white text-center min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]">
                                        Processing
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserActivity;


