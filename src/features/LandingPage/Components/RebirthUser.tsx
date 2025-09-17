import React from "react";

interface RebirthUser {
    id: number;
    level: string;
    status: string;
    position: string;
}

const RebirthUsers: React.FC = () => {
    const rebirthUsers: RebirthUser[] = [
        { id: 1, level: "6th Level", status: "Not Available", position: "Left ID" },
        { id: 2, level: "6th Level", status: "Not Available", position: "Right ID" },
        { id: 3, level: "7th Level", status: "Not Available", position: "First LeftID" },
        { id: 4, level: "7th Level", status: "Not Available", position: "First RightID" },
        { id: 5, level: "7th Level", status: "Not Available", position: "Second LeftID" },
        { id: 6, level: "7th Level", status: "Not Available", position: "Second RightID" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-280">
            {rebirthUsers.map((user) => (
                <div
                    key={user.id}
                    className="bg-black rounded-3xl sm:rounded-4xl p-4 sm:p-6 lg:p-8 border border-purple-900 max-w-130"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3 sm:mb-4 lg:mb-5">
                        <span className="text-white font-medium text-base sm:text-xl">
                            {user.status}
                        </span>
                        <span className="text-gray-400 text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6">
                            {user.position}
                        </span>
                    </div>

                    <div className="w-full bg-[#595959] rounded-full h-1 sm:h-1.5 lg:h-2 mb-2 sm:mb-3" />

                    <span className="text-yellow-400 text-base sm:text-xl font-medium">
                        {user.level}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default RebirthUsers;
