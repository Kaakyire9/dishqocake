"use client";

export default function CopyButton({ text }: { text: string }) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch (e) {
      alert('Failed to copy');
    }
  };

  return (
    <button onClick={onCopy} className="bg-pink-600 text-white px-3 py-2 rounded">Copy</button>
  );
}
