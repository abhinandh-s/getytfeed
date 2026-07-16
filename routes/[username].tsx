import { define } from "../utils.ts";
import CopyLink from "../islands/InputBar.tsx";

export const handler = define.handlers({
  GET(ctx) {
    const channelId = ctx.params.username;
    
    // Pass the channelId to the page component via ctx.render
    return ctx.render({ channelId });
  },
});

export default define.page<typeof handler>(function Page({ data }) {
  const { channelId } = data;

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold mb-2">Your RSS Link is Ready!</h1>
        <p class="text-gray-600 mb-6">Click below to copy your YouTube RSS Feed URL.</p>

        {/* Pass the server-side parameter into your interactive island */}
        <CopyLink channelId={channelId} />

        <a href="/" class="mt-8 text-sm text-blue-500 hover:underline">
           Go to Home page
        </a>
      </div>
    </div>
  );
});