import { define } from "../utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    const username = ctx.params.username;
    return new Response(
      `Hello, ${username.charAt(0).toUpperCase() + username.slice(1)}!`,
    );
  },
});