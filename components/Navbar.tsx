import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Todo List</h1>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/share">
        <a>Share List</a>
      </Link>
      <Link href="/Listpage">
        <a>Create a new list</a>
      </Link>
    </nav>
  );
};

export default Navbar;
