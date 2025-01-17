"use client";

import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, LogOut, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { logoutUserAction } from "@/actions/logout";

const searchSchema = z.object({
  query: z.string().min(1, "Query is required"),
});
const Header = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const onSearchSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await searchPostsAction(data.query);
      console.log(result);
      if (result.success) {
        setSearchResults(result.posts);
        setIsSheetOpen(true);
        reset();
      } else {
        throw new Error(result.error);
      }
    } catch (e) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await logoutUserAction();
    if (result.success) {
      router.push("/login");
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1
                onClick={() => router.push("/")}
                className="text-2xl cursor-pointer font-bold font-serif tracking-tighter"
              >
                <span className="bg-black text-white px-2 py-1 rounded-full">
                  B
                </span>
                <span className="ml-1">BlogEase</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Input
                  {...register("query")}
                  type="text"
                  placeholder="Search blogs..."
                  className="pl-10 pr-4 py-1 w-64 rounded-full bg-gray-100 border-0 focus-visible:ring-1"
                />
                <Search
                  onClick={handleSubmit(onSearchSubmit)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 cursor-pointer"
                />
              </div>
              <Button
                onClick={() => router.push("/blog/create")}
                variant="ghost"
                size="icon"
              >
                <Edit className="h-6 w-6" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[540px] sm:max-w-full"
        >
          <SheetHeader className={"flex justify-between items-center"}>
            <SheetTitle>Search Results</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((searchResultItem) => (
                <article
                  onClick={() => {
                    setIsSheetOpen(false);
                    router.push(`/blog/${searchResultItem._id}`);
                  }}
                  key={searchResultItem._id}
                  className={`cursor-pointer
                flex gap-6
              bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
                >
                  <div className={`w-1/3 h-full relative`}>
                    <img
                      src={searchResultItem?.coverImage}
                      alt={searchResultItem?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`flex-1 p-4 w-2/3`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                          {searchResultItem?.author?.name[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[16px] font-medium text-gray-700">
                        {searchResultItem?.author?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                      {searchResultItem?.title}
                    </h3>
                    <div>
                      <span>
                        {new Date(
                          searchResultItem?.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <h3>No blogs found</h3>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
