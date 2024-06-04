export default function NavButtons(props: {
  title: string;
  onClickFunction: () => any;
}) {
  const { title, onClickFunction } = props;
  return (
    <button onClick={onClickFunction} className="uppercase font-bold text-fcPalletOrangeTitle">
      <p>{title}</p>
    </button>
  );
}
