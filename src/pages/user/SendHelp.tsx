import Meta from "../../components/custom-ui/Meta";
import { HelpCard, SendHelpCard, HelpCardSkeleton } from "../../features/sendHelp";
import { useFetchLevels } from "../../features/sendHelp/hooks/useFetchLevels";

const SendHelp = () => {
  const { levels, loading, error } = useFetchLevels();

  if (loading) {
    return (
      <div className="bg-background text-foreground px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6">
          Send Help
        </h2>
        <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5">
          {[...Array(7)].map((_, i) => (
            <HelpCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background text-foreground px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const levelItems = Array.isArray(levels)
    ? levels.filter((lvl) => lvl.level_name.startsWith("Level"))
    : [];

  const referHelpLevel = Array.isArray(levels)
    ? levels.find((lvl) => lvl.level_name === "Refer Help")
    : null;

  return (
    <div>
      <Meta page="sendHelp" />
      <div className="bg-background text-foreground px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6">
          Send Help
        </h2>

        <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5">
          {levelItems.map((item) => (
            <HelpCard
              key={item.id}
              level={Number(item.level_name.replace("Level ", ""))}
              amount={parseFloat(item.amount)}
              status={item.status === "not_paid" ? "Not Paid" : "Pending"}
              levelId={item.id}
            />
          ))}

          {referHelpLevel && (
            <SendHelpCard
              levelName={referHelpLevel.level_name} 
              amount={parseFloat(referHelpLevel.amount)}
              status={referHelpLevel.status === "not_paid" ? "Not Paid" : "Pending"}
              gpay={true}
              levelId={referHelpLevel.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SendHelp;
