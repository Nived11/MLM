import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

const RebirthNoUsers = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-background text-foreground flex items-start justify-center px-4 pt-25">
            <div className="w-full max-w-[1044px]">

                <div className="rounded-[20px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">

                    <div className="rounded-[19px] bg-background p-6 sm:p-8 md:p-10">

                        <h3 className="font-medium text-xl mb-2">
                            Currently : No Rebirth Users
                        </h3>


                        <p className="text-base font-light text-white mb-6">
                            No users have completed all levels yet. Once a user finishes the
                            cycle, they will appear here.
                        </p>


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
    )
}

export default RebirthNoUsers
