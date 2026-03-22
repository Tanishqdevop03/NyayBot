import React from 'react'

const InputBox = ({ input, setInput, sendMessage }) => {
  return (
    <div className="flex gap-2 mt-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask legal question..."
        className="flex-1 p-2 rounded bg-gray-800"
      />
      <button onClick={sendMessage} className="bg-blue-600 px-4 rounded">
        Send
      </button>
    </div>
  )
}

export default InputBox