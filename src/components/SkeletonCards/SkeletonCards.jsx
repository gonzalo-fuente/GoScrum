import SkeletonCard from "./SkeletonCard";

const SkeletonCards = () => {
  const cards = [];

  for (let i = 0; i <= Math.random() * 4; i++) {
    cards.push(<SkeletonCard key={i} />);
  }

  return <>{cards}</>;
};

export default SkeletonCards;
