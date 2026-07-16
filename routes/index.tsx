import { define } from "../utils.ts";

export default define.page<typeof handlers>(function Home(ctx) {
  return (
<>
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Just provide @username and get RSS link for that channel.</h1>
        <form method="post">
        <input type="text" name="username" value="" />
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
    
  </>
  );
});

export const handlers = define.handlers({
  async GET(ctx) {
    return { data: {} };
  },
  async POST(ctx) {
    const form = await ctx.req.formData();
    const input = form.get("username")?.toString();

   if (!input) {
      return new Response("Username is required", { status: 400 });
    }

    // Add email to list.
const username = input.trim();

  const channelId = await getYoutubeChannelId(username);

  const headers = new Headers();

  if (!channelId) {
   headers.set("location", "/sorry");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  //  reply("Sorry, I couldn't find a channel with that username/handle.")
  }
 // const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`



    // Redirect user to thank you page.
    
    headers.set("location", `/${channelId}`);
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
});

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