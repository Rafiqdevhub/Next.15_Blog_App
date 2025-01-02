import { getBlogPostsAction } from "@/actions/blog";
import HomeComponent from "@/components/home/HomeComponent";

const Home = async () => {
  const posts = await getBlogPostsAction();

  return (
    <div>
      <HomeComponent posts={posts.posts} />
    </div>
  );
};

export default Home;
