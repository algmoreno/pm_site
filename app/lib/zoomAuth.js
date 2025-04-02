import axios from "axios";

// In-memory storage (Replace with Redis, MongoDB, or a database in production)
let zoomAuth = {
  accessToken: null,
  refreshToken: "YOUR_REFRESH_TOKEN", // Set your initial refresh token
  expiresAt: 0, // Expiry time (Unix timestamp)
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
        Authorization: `Basic ${Buffer.from("YOUR_CLIENT_ID:YOUR_CLIENT_SECRET").toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Update stored tokens
    zoomAuth.accessToken = response.data.access_token;
    zoomAuth.refreshToken = response.data.refresh_token;
    zoomAuth.expiresAt = Date.now() + response.data.expires_in * 1000; // Convert to timestamp

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