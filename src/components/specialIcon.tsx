interface ISpecialIcons {
  isNew: boolean;
  rating: number;
  numOfReviews: number;
}

export default function SpecialIcons(props: ISpecialIcons) {
  const isNew = props?.isNew;
  const isBestSeller = props?.rating >= 4 && props?.numOfReviews > 25;

  return (
    <div className="flex gap-2">
      {isNew && (
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
          NEW
        </span>
      )}

      {isBestSeller && (
        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
          Best Seller
        </span>
      )}

      {isNew && isBestSeller && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
          Hot Item
        </span>
      )}
    </div>
  );
}
