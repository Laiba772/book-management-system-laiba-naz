"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CreateBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, imgUrl }),
      });

      if (response.ok) {
        setTitle("");
        setAuthor("");
        setImgUrl("");
        router.refresh();
      } else {
        console.error("Failed to create book");
      }
    } catch (error) {
      console.error("Error creating book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center bg-gray-100 p-4 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-gray-800">Create New Book</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter book title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author" className="text-gray-700 font-medium">
              Author
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter author name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imgUrl" className="text-gray-700 font-medium">
              Image URL
            </Label>
            <Input
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter image URL"
            />
          </div>
        </CardContent>
        <CardFooter className="p-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 disabled:bg-blue-300 transition-colors duration-300"
          >
            {isLoading ? "Creating..." : "Create Book"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
