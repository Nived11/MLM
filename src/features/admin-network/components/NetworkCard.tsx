interface StatsProps {
  totalDownline: number;
  active: number;
  pending: number;
}

export default function Stats({ totalDownline, active, pending }: StatsProps) {
  const stats = [
    { label: "Total Downline", value: totalDownline },
    { label: "Active", value: active },
    { label: "Pending", value: pending },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#141426] rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-300">{stat.label}</p>
          <h3 className="text-xl font-bold mt-1">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
}
