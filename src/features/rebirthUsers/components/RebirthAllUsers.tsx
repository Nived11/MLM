import { Button } from "../../../components/ui/button";

const RebirthAllUsers = () => {
    const users = [
    { username: "LX75082", date: "04-Sep-2025", level: "Level 1", status: "Active" },
    { username: "LX75082", date: "04-Sep-2025", level: "Level 1", status: "Active" },
    { username: "LX75082", date: "04-Sep-2025", level: "Level 1", status: "Active" },
    { username: "LX75082", date: "04-Sep-2025", level: "Level 1", status: "Active" },
    { username: "LX75082", date: "04-Sep-2025", level: "Level 1", status: "Active" },
    { username: "LX75082", date: "04-Sep-2025", level: "Level 1", status: "Active" },
    { username: "LX75082", date: "04-Sep-2025", level: "Level 1", status: "Active" },
  ];
    return (
    <div className="bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[1044px]">
        
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Rebirth Users All</h2>

        
        <div className="rounded-[20px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-[19px] bg-background p-4 sm:p-6 md:p-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
             
              <thead>
                <tr className="text-white text-lg sm:text-xl">
                  <th className="pb-4 pr-4">Username</th>
                  <th className="pb-4 pr-4">Date of Rebirth</th>
                  <th className="pb-4 pr-4">Current Level</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="text-white text-sm">
                    
                    <td className="py-2 pr-4">
                      <div className="w-[162px] h-[42px] rounded-[13px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                        <div className="w-full h-full  flex items-center justify-center rounded-[13px] bg-background">
                          {user.username}
                        </div>
                      </div>
                    </td>

                    <td className="py-2 pr-4">
                      <div className="w-[149px] h-[42px] rounded-[13px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                        <div className="w-full h-full flex items-center justify-center rounded-[13px] bg-background">
                          {user.date}
                        </div>
                      </div>
                    </td>

                    <td className="py-2 pr-4">
                      <div className="w-[132px] h-[42px] rounded-[13px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                        <div className="w-full h-full flex items-center justify-center rounded-[13px] bg-background">
                          {user.level}
                        </div>
                      </div>
                    </td>

                    <td className="py-2">
                      <Button
                        size="sm"
                        className="w-[124px] h-[42px] rounded-[13px] bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white font-medium"
                      >
                        {user.status}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RebirthAllUsers