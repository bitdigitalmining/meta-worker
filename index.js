export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Missing code parameter", { status: 400 });
    }

    // Exchange "code" for access token
    const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token?` +
      `client_id=${env.APP_ID}&redirect_uri=${env.REDIRECT_URI}&client_secret=${env.APP_SECRET}&code=${code}`;

    const response = await fetch(tokenUrl);
    const data = await response.json();

    // Send token back as JSON
    return new Response(JSON.stringify(data, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
