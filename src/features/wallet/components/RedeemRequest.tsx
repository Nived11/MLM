import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"

const RedeemRequest = () => {
  return (
    <div className=" bg-background text-foreground flex items-center justify-center px-4 pt-25 pr-10">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-2xl font-semibold mb-4">Club Wallet Redeem Request</h2>

        <div className="rounded-[20px] p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-[19px] h-auto sm:h-[336px] bg-background p-6 sm:p-8 md:p-10">
            <h3 className="font-medium text-xl mb-2">Redeem Request</h3>
            <p className="font-light text-base mb-6"> Please enter the amount you wish to redeem from your club wallet. Our team will review and process your request </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
              <div>
                <label className="block text-base font-light mb-2">Amount :</label>
                <div className="rounded-[13px] p-[1px] w-full max-w-[447px] [background:linear-gradient(90deg,#6A00D4_0%,#FFFFFF_100%)]">
                  <Input placeholder="$" type="number"
                    className="w-full text-base font-light rounded-[12px] bg-background border-0 focus-visible:ring-ring/50 focus-visible:ring-[3px]" />
                </div>
              </div>

              <div className="flex flex-col gap-2 text-base font-light sm:items-end">
                <p> Transaction Fee : <span className="font-medium">0</span> </p>
                <p> Wallet Balance : <span className="font-medium">0</span> </p>
              </div> 
              </div>
              
            <Button variant="default" size="lg"
              className="bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-base font-semibold px-8 py-2 rounded-md" > Request </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RedeemRequest;