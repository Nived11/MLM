import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAllReferrals } from "../hooks/useAllReferrals";
import { Skeleton } from "../../../components/ui/skeleton";

interface ReferralUser {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  level: string | number; 
  [key: string]: any;
}

const RebirthNoUsers = () => {
  const navigate = useNavigate();
  const { data: users, loading, error } = useAllReferrals();

 
  const totalCompletedUsers = (users as ReferralUser[] | undefined)
    ? (users as ReferralUser[]).filter(user => {
        let levelNumber: number = 0;

        if (typeof user.level === "string") {
          const match = user.level.match(/\d+/); 
          levelNumber = match ? parseInt(match[0], 10) : 0;
        } else if (typeof user.level === "number") {
          levelNumber = user.level;
        }

        return levelNumber >= 6; 
      }).length
    : 0;

  return (
    <div className="bg-background text-foreground flex items-start justify-center px-4 pt-25">
      <div className="w-full max-w-[1044px]">
        <div className="rounded-[20px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-[19px] bg-background p-6 sm:p-8 md:p-10">
            {loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[200px] h-6 rounded-md" />
                <Skeleton className="w-[500px] h-6 rounded-md" />
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <h3 className="font-medium text-xl mb-2">
                  Total Rebirth Users: {totalCompletedUsers || 0}
                </h3>
                {totalCompletedUsers === 0 && (
                  <p className="text-base font-light text-white mb-6">
                    No users have completed all levels yet. Once a user finishes
                    the cycle, they will appear here.
                  </p>
                )}
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/rebirth-users/invite-form")}
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-base font-semibold px-6 py-2 rounded-md w-full sm:w-auto"
              >
                Invite New Users
              </Button>
              <Button
                onClick={() => navigate("/rebirth-users/all-users")}
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-base font-semibold px-6 py-2 rounded-md w-full sm:w-auto"
              >
                View all rebirth users
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebirthNoUsers;
