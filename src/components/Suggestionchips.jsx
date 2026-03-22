
const Suggestionchips = ({ setInput }) => {
    const suggestions = [
    "FIR kaise file kare?",
    "Divorce process India",
    "Consumer complaint kaise kare",
    "Police rights kya hote hain",
  ];
  return (
     <div className="flex flex-wrap gap-2 mb-3">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => setInput(s)}
          className="bg-gray-700 px-3 py-1 rounded-full text-sm"
        >
          {s}
        </button>
      ))}
    </div>
  )
}

export default Suggestionchips