import { verifyAuth } from "@/lib/auth";
import Header from "./Header";
import { cookies } from "next/headers";
import Footer from "./Footer";

const Layout = async ({ children }) => {
  const token = (await cookies()).get("token")?.value;
  const user = await verifyAuth(token);

  return (
    <div className="min-h-screen bg-white">
      {user && <Header user={user} />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
