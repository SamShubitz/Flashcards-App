import Button from "./Button";

export type Card = { front: string; back: string };

const CustomForm = ({
  nextCard,
  handleFormChange,
  handleSubmit,
}: {
  nextCard: Card;
  handleFormChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <label htmlFor="question-input" />
      <input
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
      <label htmlFor="answer-input" />
      <input
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

      <Button type="submit" className="px-2 py-2 text-xs ml-2">
        Add card
      </Button>
    </form>
  );
};

export default CustomForm;
