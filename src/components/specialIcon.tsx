interface ISpecialIcons {
  isNew: boolean;
  rating: number;
  numOfReviews: number;
}

export default function SpecialIcons(props: ISpecialIcons) {
  const isNew = props?.isNew;
  const isBestSeller = props?.rating >= 4 && props?.numOfReviews > 25;

  const type = () => {
    if (isNew && isBestSeller) {
      return <img alt="hot" src="/assets/hot.svg" />;
    } else if (isBestSeller) {
      return <img alt="best" src="/assets/best.svg" />;
    } else if (isNew) {
      return <img alt="new" src="/assets/new.svg" />;
    } else {
      return;
    }
  };

  return <div className="absolute top-0 right-0 z-10">{type()}</div>;
}
