import { useState } from "react";
import useSWR from "swr";
import { Book } from "../types/schema";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import { Button } from "../components/ui/button";
import { useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Home() {
  const [location, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  
  const { data: books, error, isLoading } = useSWR<Book[]>(
    `/api/books?search=${search}&sort=${sort}`
  );

  if (error) return <div>Failed to load books</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Book Management</h1>
        <Button onClick={() => navigate("/books/new")}>Add New Book</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BookList books={books || []} />
    </div>
  );
}
