import { Book } from "../types/schema";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useLocation } from "wouter";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { mutate } from "swr";
import { useToast } from "../hooks/use-toast";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  async function handleDelete() {
    try {
      const response = await fetch(`/api/books/${book.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete book");

      toast({
        title: "Success",
        description: "Book deleted successfully",
      });

      mutate("/api/books");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">By {book.author}</p>
        <p className="text-sm mt-2">{book.description}</p>
        <div className="mt-4 space-y-1">
          <p className="text-sm">
            <span className="font-medium">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm">
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
          <p className="text-sm">
            <span className="font-medium">Published:</span> {book.publishedYear}
          </p>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button
          variant="outline"
          onClick={() => navigate(`/books/${book.id}/edit`)}
        >
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the book.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
