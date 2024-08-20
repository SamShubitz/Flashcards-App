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
  onSave: () => Promise<string | undefined>;
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
    const error = await onSave();
    if (error) {
      setMessage({ text: error, error: true });
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        disabled={deck.cards[0].front === ""}
        className="bg-slate-900 text-white text-xs rounded-md px-3 border font-medium border-input bg-background hover:bg-accent hover:bg-slate-800 disabled:opacity-50 disabled:bg-slate-800"
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
          <Button className="bg-slate-900 text-white" onClick={handleOnSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveDialog;
