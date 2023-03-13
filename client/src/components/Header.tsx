const Header = () => {
  return (
    <header className="navbar bg-neutral text-neutral-content gap-2 py-4 fixed top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Miniposts</a>
      </div>

      <label tabIndex={0} className="btn btn-ghost btn-square avatar">
        <div className="w-10 h-10 relative">
          <span className="bg-green-300 w-full h-full block"></span>
        </div>
      </label>
      <button className="btn btn-warning btn-outline">Logout</button>
    </header>
  );
};
export default Header;
