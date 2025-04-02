import axios from "axios";

let zoomAuth = {
  accessToken: null,
  refreshToken: "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6Ijc0YTgwMmI2LWNiZjMtNDYzZS04MTlhLWFkM2U5ZDRlMjRjZSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJlN3VRZzVScVRaZVhpeEZFUFIzY053IiwidmVyIjoxMCwiYXVpZCI6ImExNDYwMDljMGU3OGI5YTg3M2M2YWY2ODZkYTk4MzhlZDc4ZjA1MDViMjU4NmYxZTBkYmJiMjk5NWRjMDA4ODciLCJuYmYiOjE3NDM2MzAyMjgsImNvZGUiOiJicjd3c3FQVkNpbWRZOGtYU1R1UkZ5MTRNUGN4dVNncWciLCJpc3MiOiJ6bTpjaWQ6bEJraGIycVFSeldZME5OTjJfcEEiLCJnbm8iOjAsImV4cCI6MTc1MTQwNjIyOCwidHlwZSI6MSwiaWF0IjoxNzQzNjMwMjI4LCJhaWQiOiJianp3VmR2dFFPQ0RhLUZ3RVNFLVhnIn0._Pidgd7pBGdMawPA9SbnXkMAJ0rsPGf8EfggaqNS9_mGN0pggGdTVRgTBN3Dd52jxh_DqnNSebUu_XJd64prpw", 
  expiresAt: 0, 
};

// Function to refresh access token
const refreshZoomToken = async () => {
  try {
    console.log("Refreshing Zoom access token...");
    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "refresh_token",
        refresh_token: zoomAuth.refreshToken,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Update stored tokens
    zoomAuth.accessToken = response.data.access_token;
    zoomAuth.refreshToken = response.data.refresh_token;
    zoomAuth.expiresAt = Date.now() + response.data.expires_in * 1000; 

    console.log("New Zoom Access Token:", zoomAuth.accessToken);
  } catch (error) {
    console.error("Failed to refresh Zoom token:", error.response?.data || error.message);
  }
};

// Function to get a valid access token
export const getZoomAccessToken = async () => {
  if (!zoomAuth.accessToken || Date.now() >= zoomAuth.expiresAt) {
    await refreshZoomToken();
  }
  return zoomAuth.accessToken;
};