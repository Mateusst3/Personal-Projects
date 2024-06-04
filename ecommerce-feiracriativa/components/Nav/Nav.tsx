import NavButtons from "./NavButtons";

export default function Nav() {
  return (
    <>
      <nav className="w-screen h-auto flex flex-row items-center justify-between bg-fcPalletRedStrong px-8 pb-4">
        <a href="">
          <img
            src="/images/logos/horizontal-logo.png"
            alt=""
            className="h-32 w-[400px] object-cover"
          />
        </a>
        <div className="flex flex-row items-center justify-center gap-4">
          <NavButtons onClickFunction={() => undefined} title="Home" />
          <NavButtons onClickFunction={() => undefined} title="Login" />
          <NavButtons onClickFunction={() => undefined} title="Crie sua conta" />

        </div>
      </nav>
    </>
  );
}
