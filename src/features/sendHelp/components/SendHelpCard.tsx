import { ArrowRight } from "lucide-react"
import { Button } from "../../../components/ui/button"
import gpayImg from "../../../assets/images/gpay.png"
import { IoLogoWhatsapp } from "react-icons/io"
import { useNavigate } from "react-router-dom"

interface SendHelpCardProps {
    amount: number
    status: "Pending" | "Not Paid"
    gpay?: boolean
}

const SendHelpCard = ({ amount, status, gpay = true }: SendHelpCardProps) => {
    const navigate = useNavigate()
    return (
        <div className="rounded-[20px] bg-gradient-to-br from-[#1C1332] to-[#2F2061] p-4 w-[367px] flex flex-col gap-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
                <div className="w-[119px] h-[31px] flex items-center justify-center rounded-[20px] text-base font-light bg-gradient-to-r from-[#6A00D4] to-[#5C1053]">
                    Active
                </div>
                <div className="w-[119px] h-[31px] rounded-[20px] bg-gradient-to-r from-[#6E07CF] to-[#6C1161] p-[2px]">
                    <div className="flex items-center justify-center w-full h-full rounded-[20px] bg-gradient-to-r from-[#1C1332] to-[#2F2061] text-base font-light text-white">
                        {status === "Not Paid" ? "Not Paid" : "Pending"}
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold">Send Help</h3>

            <div className="flex items-center gap-3">
                <div className="w-[84px] h-[26px] rounded-[20px] p-[1px] bg-gradient-to-r from-[#6E07CF] to-[#FFFFFF]">
                    <div className="w-full h-full flex items-center justify-center rounded-[20px] bg-gradient-to-r from-[#1C1332] to-[#2F2061] text-white text-base font-semibold">
                        {amount}
                    </div>
                </div>
                {gpay && (
                    <div className="w-[66px] h-[21px] flex items-center gap-1 rounded-[20px] bg-white px-2">
                        <img src={gpayImg} alt="GPay" className="w-4 h-4" />
                        <span className="text-xs font-light text-[#4275BC]">G Pay</span>
                    </div>
                )}
                <button
                onClick={() => navigate("/send-help/payment")}
                    className="w-[115px] h-[24px] rounded-[8px] bg-white text-[#6A00D4] shadow-[0px_4px_4px_0px_#FFFFFF40] text-sm font-normal flex items-center justify-center">
                    Pay Now
                </button>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Button className="w-[195px] h-[42px] rounded-[20px] p-[2px] bg-gradient-to-r from-[#6E07CF] to-[#FFFFFF] flex items-center justify-between">
                    <div className="w-full h-full flex items-center justify-between px-4 rounded-[20px] bg-gradient-to-r from-[#1C1332] to-[#2F2061] text-white text-base font-light">
                        View Profile
                        <ArrowRight size={16} />
                    </div>
                </Button>
                <button className="flex items-center justify-center">
                    <IoLogoWhatsapp size={35} className="text-white" />
                </button>
            </div>
        </div>
    )
}

export default SendHelpCard
