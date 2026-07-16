import { useSignal } from "@preact/signals";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import getYoutubeChannelId from "../islands/inputBar.tsx";

export default define.page<typeof handlers>(function Home(ctx) {
  const count = useSignal(3);

  ctx.state.title = count.value + " Fresh Counter" +
    (Math.abs(count.value) === 1 ? "" : "s");

  return (
<>
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Just provide @username and get RSS link for that channel.</h1>
        <form method="post">
        <input type="username" name="username" value="" />
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

    // Add email to list.
const username = input.trim();

  const channelId = await getYoutubeChannelId(username);

  if (!channelId) {
  //  reply("Sorry, I couldn't find a channel with that username/handle.")
  }
 // const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`



    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/${channelId}");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
});