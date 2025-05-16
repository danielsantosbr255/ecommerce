import React from "react";
import { Bell } from "lucide-react";
import SearchBar from "@/components/ui/Searchbar";

export default function AdminHeader() {
  return (
    <nav className="bg-white grid grid-cols-2 items-center justify-between gap-4 h-20 p-2 w-full rounded-2xl shadow-xs">
      <SearchBar />

      <div className="flex items-center space-x-10 justify-end mr-4">
        <button className="relative focus:outline-none">
          <Bell size={25} />
          <>
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-primary rounded-full"></span>
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-primary rounded-full animate-ping"></span>
          </>
        </button>

        <button className="flex items-center space-x-2">
          <span>Admin</span>
        </button>
      </div>
    </nav>
  );
}
