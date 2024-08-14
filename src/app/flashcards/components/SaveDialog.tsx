import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Deck } from "./FlashcardMode";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SaveDialogue = ({
  onSave,
  setDeck,
  deck,
}: {
  onSave: () => void;
  setDeck: (e: any) => void;
  deck: Deck;
}) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const name = e.target.value;
    setDeck({ ...deck, name: name });
  };

  const handleOnSave = () => {
    if (deck.name === "") {
      setMessage("Please enter a name");
    } else {
      onSave();
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-slate-900 p-2 rounded-md text-xs text-white">
        Save deck
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Name your deck:</DialogTitle>
          <DialogDescription>
            <Input
              placeholder="New deck"
              value={deck.name}
              onChange={handleChange}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleOnSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveDialogue;
