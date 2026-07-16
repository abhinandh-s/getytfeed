import { define } from "../utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    const username = ctx.params.username; 
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
});