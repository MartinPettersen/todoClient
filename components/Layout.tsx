import Navbar from "../components/Navbar";

import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="content">
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
