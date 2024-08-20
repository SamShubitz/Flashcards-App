import FlashcardMode from "@/app/flashcards/components/FlashcardMode";

const Flashcards = async () => {
  return (
    <div className="w-5/6 max-w-[40rem] border-gray-200 border-[1px] flex items-center justify-between rounded-lg">
      <FlashcardMode />
    </div>
  );
};

export default Flashcards;
