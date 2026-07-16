import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface CopyProps {
  count: Signal<number>;
}

export default function CopyLink(props: CopyProps) {
      const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(username);
alert("Copied the text: " + username);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

    return (
      // <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      // <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
       // <img
        //  class="my-6"
       //   src="/logo.svg"
         // width="128"
        //  height="128"
         // alt="the Fresh logo: a sliced lemon dripping with juice"
      //  />
        <h1 class="text-4xl font-bold">Just provide @username and get RSS link for that channel.</h1>
        <input type="text" value={username} id="myInput">
         <button onClick={handleCopy}>
        {copied.value ? "Copied! ✓" : "Copy Link"}
      </button>
  //    </div>
  //  </div>
    );
}

export function extractHandle(input: string): string {
  const atIndex = input.lastIndexOf('@')
  return atIndex === -1 ? input : input.slice(atIndex + 1)
}

console.log('---- tests ----')
console.log(await getYoutubeChannelId('https://youtube.com/@judosloth'))
console.log(await getYoutubeChannelId('@pewdiepie'))
console.log(await getYoutubeChannelId('jacksepticeye'))
console.log('---------------')

// Function to fetch YouTube Channel ID
export async function getYoutubeChannelId(username: string): Promise<string | null> {
  const apiKey = Deno.env.get('YOUTUBE_API_KEY')
  // const cleanHandle = username.startsWith("@") ? username : `@${username}`;
  const cleanHandle = extractHandle(username)
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=@${cleanHandle}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      return data.items[0].id
    } else {
      return null
    }
  } catch (error) {
    console.error('YouTube API Error:', error)
    return null
  }
}