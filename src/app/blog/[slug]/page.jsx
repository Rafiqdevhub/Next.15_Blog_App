import { getBlogPostByIdAction } from "@/actions/blog";
import BlogDetail from "@/components/blog/BlogDetail";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const BlogDetailsPage = async ({ params }) => {
  const { slug } = params;

  const data = await getBlogPostByIdAction(slug);

  if (data.error) {
    notFound();
  }

  const { post } = data;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogDetail post={JSON.parse(post)} />
    </Suspense>
  );
};

export default BlogDetailsPage;
