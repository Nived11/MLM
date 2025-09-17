

const PaymentsApproved = () => {
    const payments = [
        { username: "LX10234", level: 1, amount: "₹10,000", mode: "G PAY", txn: "TXN12345", status: "Paid" },
        { username: "LX20345", level: 2, amount: "₹5,000", mode: "G PAY", txn: "TXN12545", status: "Paid" },
        { username: "LX508845", level: 1, amount: "₹1,000", mode: "G PAY", txn: "TXN12645", status: "Paid" },
        { username: "LX10284", level: 2, amount: "₹2,000", mode: "G PAY", txn: "TXN72345", status: "Paid" },
        { username: "LXJ0234", level: 2, amount: "₹10,000", mode: "G PAY", txn: "TXG12345", status: "Paid" },
        { username: "LX90234", level: 1, amount: "₹1,000", mode: "G PAY", txn: "TXN12945", status: "Paid" },
    ];
    return (
        <div className="bg-background text-foreground p-4 sm:p-6 rounded-2xl">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6">
                Payments  Approved
            </h2>

            <div className="overflow-x-auto rounded-2xl bg-[#0E0B1A] p-4">
                <table className="w-full  text-sm sm:text-base text-white">
                    <thead className="uppercase text-sm font-normal text-white border-b border-[#1c1a29]">
                        <tr className="text-center">
                            <th className="pb-3 px-2 sm:px-4">Username</th>
                            <th className="pb-3 px-2 sm:px-4">Level</th>
                            <th className="pb-3 px-2 sm:px-4">Amount</th>
                            <th className="pb-3 px-2 sm:px-4">Payment Mode</th>
                            <th className="pb-3 px-2 sm:px-4">Transaction ID</th>
                            <th className="pb-3 px-2 sm:px-4">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((p, i) => (
                            <tr key={i} className="border-b border-[#1c1a29] text-xs last:border-none text-center">
                                <td className="py-3 px-2 sm:px-4">{p.username}</td>
                                <td className="py-3 px-2 sm:px-4">{p.level}</td>
                                <td className="py-3 px-2 sm:px-4">{p.amount}</td>
                                <td className="py-3 px-2 sm:px-4">{p.mode}</td>
                                <td className="py-3 px-2 sm:px-4">{p.txn}</td>
                                <td className="py-3 px-2 sm:px-4">
                                    <div
                                        className="inline-flex items-center justify-center px-4 py-1 text-xs font-light text-white w-[98px] h-[30px] rounded-[41px] border-[2px] bg-gradient-to-r from-[#6A00D4] to-[#5C1053] border-none">
                                        {p.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaymentsApproved