import CreateBlogForm from "@/components/blog/CreateBlogForm";
import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export const metadata = {
  title: "Create Blog",
  description: "Create a new blog post",
};

const CreateBlogPage = async () => {
  const token = (await cookies()).get("token")?.value;
  const user = await verifyAuth(token);
  return <CreateBlogForm user={user} />;
};

export default CreateBlogPage;
