// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StockStatus({ stock, hover }: any) {
  let status = "";
  let color = "";

  if (stock === 0) {
    status = "Sold Out";
    color = "text-red-600";
  } else if (stock < 5) {
    status = `Stock < 5`;
    color = "text-red-600";
  } else {
    status = "In Stock";
    color = "text-green-600";
  }

  return (
    <p
      className={`relative text-sm font-medium z-30 ${
        hover ? "text-white" : color
      }`}
    >
      {status}
    </p>
  );
}
