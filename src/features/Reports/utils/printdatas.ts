export const printUsers = (rows: string[][] | null) => {
  if (!rows) return;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) return;

  const html = `
    <html>
      <head>
        <title>User Joining Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #000; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #333; padding: 8px; text-align: left; font-size: 13px; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <h2>User Joining Report</h2>
        <table>
          <thead>
            <tr>${rows[0].map((h) => `<th>${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows
              .slice(1)
              .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};
