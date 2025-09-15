import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Switch } from "../../../components/ui/switch"
import { CloudUpload } from "lucide-react"
import { FaCopy } from "react-icons/fa"

const SendHelpPayment = () => {
    const [showUpload, setShowUpload] = useState(true)

    return (
        <div className="bg-background text-foreground flex items-center justify-center px-3 py-8">
            <div className="w-full max-w-[900px]">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">Payment Step</h2>
                <div className="rounded-xl p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                    <div className="rounded-xl bg-background p-4 sm:p-6 flex flex-col gap-4">
                        <div className="rounded-lg p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                            <div className="flex items-center justify-between w-full h-[42px] rounded-lg bg-black px-3">
                                <span className="text-sm sm:text-base font-medium text-white">
                                    UPIDETAILS-9961900650
                                </span>
                                <button className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-white/30 text-white bg-transparent">
                                    <FaCopy size={14} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="rounded-lg p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                                <Input
                                    value="LX16306"
                                    readOnly
                                    className="w-full h-[42px] rounded-lg bg-black text-white text-sm sm:text-base font-medium border-0"
                                />
                            </div>
                            <p className="text-[10px] sm:text-xs text-orange-500 mt-1">
                                Full Name : PRASANNAKUMARI B
                            </p>
                        </div>

                        <div className="rounded-lg p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                            <Input
                                value="1000"
                                type="number"
                                className="w-full h-[42px] rounded-lg bg-black text-white text-sm sm:text-base font-medium border-0" />
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm sm:text-base font-medium text-white">
                                Payment with/without Proof
                            </span>
                            <Switch
                                checked={showUpload}
                                onCheckedChange={(checked) => setShowUpload(checked)} />
                        </div>

                        {showUpload && (
                            <div className="rounded-md p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)] w-fit">
                                <label className="w-[150px] h-[38px] flex items-center justify-center gap-2 rounded-md bg-transparent text-white text-sm sm:text-base font-medium cursor-pointer">
                                    <CloudUpload size={16} />
                                    Choose File
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <div className="rounded-lg p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                                <Button
                                    className="w-[100px] h-[38px] rounded-lg bg-transparent text-white text-sm sm:text-base font-medium border-0">
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
