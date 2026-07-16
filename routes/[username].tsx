import { define } from "../utils.ts";
import CopyLink from "../islands/Copier.tsx";

export const handler = define.handlers({
  GET(ctx) {
    const channelId = ctx.params.username;
    
    return { data: { channelId } };
  },
});

export default define.page<typeof handler>(function Page({ data }) {
  const { channelId } = data;

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold mb-60">Your RSS Link is Ready!</h1>
        <p class="text-gray-600 mb-6 pb-10">Click below to copy your YouTube RSS Feed URL.</p>

        {/* Pass the server-side parameter into your interactive island */}
        <CopyLink channelId={channelId} />

        <a href="/" class="mt-16 text-sm text-blue-500 hover:underline">
           Go to Home page
        </a>
      </div>
    </div>
  );
});