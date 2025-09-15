import Meta from "../../components/custom-ui/Meta"
import { HelpCard, SendHelpCard } from "../../features/sendHelp"

const SendHelp = () => {
  const levels = [
    { level: 1, amount: 100, status: "Pending" },
    { level: 2, amount: 200, status: "Pending" },
    { level: 3, amount: 400, status: "Pending" },
    { level: 4, amount: 1000, status: "Pending" },
    { level: 5, amount: 2000, status: "Pending" },
    { level: 6, amount: 5000, status: "Pending" },
    { level: 7, amount: 10000, status: "Pending" },
  ] as const

  return (
    <div>
      <Meta page="sendHelp" />
      <div className="bg-background text-foreground px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6">Send Help</h2>

        <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5">
          {levels.map((item, index) => (
            <HelpCard
              key={index}
              level={item.level}
              amount={item.amount}
              status={item.status}
            />
          ))}
          <SendHelpCard amount={1000} status="Not Paid" gpay={true} />
        </div>
      </div>
    </div>
  )
}

export default SendHelp
