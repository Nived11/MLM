import Meta from "../../components/custom-ui/Meta";
import { Pagination } from "../../features/Reports";
import { BonusSumDashboard , Search, Downloadbtn, Table} from "../../features/Reports/BonusSummary"

const ReportBonusSummary = () => {
  return (
    <>
      <div className="px-4 py-4  text-white mb-8">
        <Meta page="Report" />
        <h1 className="text-2xl font-bold  ">Report</h1>
        <div className="py-8 text-white">

          <BonusSumDashboard />

          <div className=" rounded-xl p-[1px] bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)]">
            <div className="rounded-xl bg-black p-6">
              <h2 className="text-lg font-semibold mb-4">Bonus Summary</h2>

              <Search />

              <Downloadbtn />

              <Table />

              <Pagination />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportBonusSummary;
