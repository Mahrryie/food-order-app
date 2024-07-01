import headerLogo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="Foor app" />
        <h1></h1>
      </div>
      <nav>
        <button>Cart</button>
      </nav>
    </header>
  );
}
