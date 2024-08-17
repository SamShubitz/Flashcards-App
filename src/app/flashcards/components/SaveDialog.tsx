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

const SaveDialog = ({
  onSave,
  setDeck,
  deck,
}: {
  onSave: () => void;
  setDeck: (e: any) => void;
  deck: Deck;
}) => {
  const [message, setMessage] = useState({
    text: "Please enter a name",
    error: false,
  });
  const errorStatus = message.error ? "visible" : "invisible";

  const handleChange = (e: any) => {
    const name = e.target.value;
    setDeck({ ...deck, name: name });
    setMessage({ ...message, error: false });
  };

  const handleOnSave = async () => {
    if (deck.name === "") {
      setMessage({ text: "Please enter a name", error: true });
      return;
    }
    if (deck.name.length >= 21) {
      setMessage({
        text: "Deck name must be 20 characters or less",
        error: true,
      });
      return;
    }
    onSave();
  };

  return (
    <Dialog>
      <DialogTrigger
        disabled={deck.cards[0].front === ""}
        className="text-xs rounded-md px-3 border font-medium border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:hover:bg-white"
      >
        Save deck
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Name your deck:</DialogTitle>
          <Input
            placeholder="New deck"
            value={deck.name}
            onChange={handleChange}
          />
          <DialogDescription
            className={`text-xs text-destructive ${errorStatus}`}
          >
            {message.text}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleOnSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveDialog;
