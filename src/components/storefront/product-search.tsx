"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { Input } from "../ui/input";
import { LoadingSkeleton } from "../ui/loading-skeleton";

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [confirmedHasNoResults, setConfirmedHasNoResults] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // useEffect(() => {
  //
  // }, [searchTerm]);

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <button
          className="border border-border px-4 py-2 rounded-md w-full flex items-center justify-between gap-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <p className="text-muted-foreground text-sm">Search...</p>
          <p className="text-sm text-muted-foreground hidden md:block">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </button>
      </div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search for a product</DialogTitle>
            <DialogDescription>
              Search our entire product catalogue
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col gap-2 items-start justify-start">
            {isLoadingResults && <LoadingSkeleton className="w-full h-12" />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
