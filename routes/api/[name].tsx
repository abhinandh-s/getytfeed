import { define } from "../../utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    const name = ;
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${ctx.params.name}`;
    return new Response(
      `${rssUrl}`,
    );
  },
});
