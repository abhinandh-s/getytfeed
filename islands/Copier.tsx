import { useSignal } from "@preact/signals";

interface CopyInputProps {
  channelId: string;
}

export default function CopyInput({ channelId }: CopyInputProps) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const copied = useSignal(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rssUrl);
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div class="flex gap-2 w-full max-w-md mt-4">
      <input
        type="text"
        size="30"
        value={rssUrl}
        readOnly
        class="flex-1 px-4 py-2 border rounded-md shadow-sm bg-gray-50 text-gray-600"
      />
      <button
        onClick={handleCopy}
        class={`px-6 py-2 font-medium rounded-md text-white transition-colors ${
          copied.value ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {copied.value ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}