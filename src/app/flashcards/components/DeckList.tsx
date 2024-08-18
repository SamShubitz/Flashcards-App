"use client";

import { Deck } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteDeck } from "../actions";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { revalidateByPath } from "@/lib/revalidate";

const DeckList = ({ decks }: { decks: Deck[] }) => {
  const [selectedDeck, setSelectedDeck] = useState("");
  const router = useRouter();
  const { id } = useParams();

  const deckList = decks.map((deck) => {
    return (
      <SelectItem key={deck.id} value={deck.id} className="text-xs">
        {deck.name}
      </SelectItem>
    );
  });

  const handleDeckSelect = (deckId: string) => {
    router.push(`/flashcards/${deckId}`);
    setSelectedDeck("");
  };

  return (
    // <Collapsible>
    //   <CollapsibleTrigger className="h-[12rem]">DECKS</CollapsibleTrigger>
    //   <CollapsibleContent>
    <div className="bg-zinc-100 md:flex-1 self-start md:self-center md:h-[650px] md:max-w-[15rem] rounded-lg mb-6 md:ml-4 p-4 flex items-start justify-center w-full">
      <div className="h-full pt-12 p-3 md:block flex flex-wrap items-center gap-2">
        <div className="border-b-[1px] border-b-slate-300 pb-4 mb-4">
          <p className="text-slate-800 text-sm font-semibold mb-4">MY DECKS</p>
          <Select
            value={selectedDeck}
            onValueChange={handleDeckSelect}
            disabled={decks.length === 0}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a deck" />
            </SelectTrigger>
            <SelectContent>{deckList}</SelectContent>
          </Select>
        </div>
        <div className="text-gray-800 font-semibold my-2">
          <Link
            className="text-sm"
            href="/flashcards"
            onClick={() => {
              localStorage.removeItem("flashcards");
              revalidateByPath("/flashcards");
            }}
          >
            <Button className="text-xs w-[6rem]">New deck</Button>
          </Link>
        </div>
        <AlertDialog>
          <AlertDialogTrigger
            disabled={!id}
            className="border-[1px] text-xs font-medium w-[6rem] py-3 rounded-md bg-white hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-white"
          >
            Delete deck
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the deck.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={deleteDeck.bind(null, id as string)}>
                <AlertDialogAction
                  className="bg-white text-black border-[1px] w-full hover:bg-slate-100"
                  type="submit"
                >
                  Delete
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    //   </CollapsibleContent>
    // </Collapsible>
  );
};

export default DeckList;
