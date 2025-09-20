const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); 
  const month = date.toLocaleString("en-US", { month: "short" }); 
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default formatDate;