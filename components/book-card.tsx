"use client";

import { useState } from "react";
import { Book } from "@/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookCard({ author, id, imgUrl, title }: Book) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAuthor, setUpdatedAuthor] = useState(author);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBook = {
      id,
      title: updatedTitle,
      author: updatedAuthor,
      imgUrl,
    };
    try {
      const response = await fetch(`/api/books`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
      if (response.ok) {
        router.refresh();
        setIsUpdateDialogOpen(false);
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/books`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        router.refresh();
        console.log("Book deleted successfully");
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <Card className="h-full w-full max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg group">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="line-clamp-1 text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-1 mt-2 text-sm text-gray-600">
          {author}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full border-gray-300 hover:bg-gray-100 transition-colors duration-300"
            >
              Update
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 rounded-lg shadow-md border border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Update Book</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </Label>
                <Input
                  id="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author
                </Label>
                <Input
                  id="author"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={updatedAuthor}
                  onChange={(e) => setUpdatedAuthor(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          variant="destructive"
          className="rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
