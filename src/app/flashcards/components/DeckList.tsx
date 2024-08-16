"use client";

import { Deck } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteDeck } from "../actions";

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
    <div className="flex-1 h-[715px] max-w-[16rem] flex flex-col rounded-lg border-gray-200 p-4">
      <div className="h-full pt-12 p-3">
        <div className="border-b-[1px] border-b-slate-300 pb-4 mb-4">
          <p className="text-gray-800 text-sm font-semibold mb-4">MY DECKS</p>
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
          <Link className="text-sm" href="/flashcards">
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
  );
};

export default DeckList;
