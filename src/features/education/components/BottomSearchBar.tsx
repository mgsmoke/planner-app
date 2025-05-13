function BottomSearchBar() {
  return (
    <div className="fixed bottom-12 left-0 right-0 px-4 z-10">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full max-w-3xl mx-auto block border border-gray-300 rounded-full py-2 px-4 shadow"
      />
    </div>
  );
}

export default BottomSearchBar;
