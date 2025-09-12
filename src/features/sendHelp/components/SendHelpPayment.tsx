import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Switch } from "../../../components/ui/switch"
import { CloudUpload } from "lucide-react"
import { FaCopy } from "react-icons/fa"

const SendHelpPayment = () => {
    const [showUpload, setShowUpload] = useState(true)

    return (
        <div className="bg-background text-foreground flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-[1044px]">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Payment Step</h2>

                <div className="rounded-[20px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                    <div className="rounded-[19px] bg-background p-6 sm:p-8 md:p-10 flex flex-col gap-6">

                        <div className="rounded-[13px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                            <div className="flex items-center justify-between w-full h-[53px] rounded-[12px] bg-black px-4">
                                <span className="text-base font-medium text-white">
                                    UPIDETAILS-9961900650
                                </span>
                                <button className="w-[35px] h-[35px] flex items-center justify-center rounded-full border border-white/30 text-white bg-transparent">
                                    <FaCopy size={18} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="rounded-[13px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                                <Input
                                    value="LX16306"
                                    readOnly
                                    className="w-full h-[53px] rounded-[12px] bg-black text-white text-base font-medium border-0"
                                />
                            </div>
                            <p className="text-xs text-orange-500 mt-1">
                                Full Name : PRASANNAKUMARI B
                            </p>
                        </div>

                        <div className="rounded-[13px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                            <Input
                                value="1000"
                                type="number"
                                className="w-full h-[53px] rounded-[12px] bg-black text-white text-base font-medium border-0"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-base font-medium text-white">
                                Payment with/without Proof
                            </span>
                            <Switch
                                checked={showUpload}
                                onCheckedChange={(checked) => setShowUpload(checked)}
                            />
                        </div>

                        {showUpload && (
                            <div className="rounded-[8px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)] w-fit">
                                <label className="w-[190px] h-[46px] flex items-center justify-center gap-2 rounded-[8px] bg-transparent text-white text-base font-semibold cursor-pointer">
                                    <CloudUpload size={18} />
                                    Choose File
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <div className="rounded-[13px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                                <Button
                                    className="w-[120px] h-[46px] rounded-[12px] bg-transparent text-white text-base font-semibold border-0"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendHelpPayment
