import { define } from "../utils.ts";
import CopyLink from "../islands/Copier.tsx";

export const handler = define.handlers({
  GET(ctx) {
    const channelId = ctx.params.id;
    return { data: { channelId } };
  },
});

export default define.page<typeof handler>(function Page({ data }) {
  const { channelId } = data;

  return (
    <div class="p-8 min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold">Your RSS Link is Ready!</h1>
        <p class="text-gray-600">Click below to copy your YouTube RSS Feed URL.</p>

        <CopyLink channelId={channelId} />

        <a href="/" class="text-sm text-green-500 hover:underline">
           Go to Home page
        </a>
      </div>
    </div>
  );
});