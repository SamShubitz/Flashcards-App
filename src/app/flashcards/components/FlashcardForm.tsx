import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type Card = { id?: string; front: string; back: string };

const CustomForm = ({
  className,
  nextCard,
  handleFormChange,
  handleSubmit,
}: {
  className: string;
  nextCard: Card;
  handleFormChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}) => {
  return (
    <form onSubmit={handleSubmit} className={className}>
      <label htmlFor="question-input">
        <Input
          id="question-input"
          name="front"
          minLength={1}
          className="pl-2"
          type="text"
          placeholder="question"
          value={nextCard.front}
          onChange={handleFormChange}
          required
        />
      </label>
      <label htmlFor="answer-input">
        <Input
          id="answer-input"
          name="back"
          minLength={1}
          className="pl-2"
          type="text"
          placeholder="answer"
          value={nextCard.back}
          onChange={handleFormChange}
          required
        />
      </label>
      <Button
        type="submit"
        className="bg-slate-900 text-white hover:bg-slate-900 hover:text-white hover:opacity-50 px-2 py-2 text-xs ml-2"
      >
        Add card
      </Button>
    </form>
  );
};

export default CustomForm;
