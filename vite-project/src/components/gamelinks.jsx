import React, { useEffect, useState } from "react";

// You should get these from a secure environment variable, not hardcoded.
const API_KEY = "AIzaSyCmkJHA60eUUM8RirRKGLobwMg_ShJIZag";
const CHANNEL_ID = "UCFbYQycybEVQzzCp6O-FzrQ";

const Gamelinks = () => {
  const [ytDownloadLink, setYtDownloadLink] = useState(null);
  const [status, setStatus] = useState("loading"); // 'loading', 'done', 'patched', 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const stripHtml = (html) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    const extractDownloadLink = (commentHtml) => {
      const text = stripHtml(commentHtml);
      // More robust regex to handle different spacings and characters
      const regex = /DOWNLOAD\s+HERE\s*:\s*(https?:\/\/[^\s]+)/i;
      const match = text.match(regex);

      return match ? match[1] : null;
    };

    const fetchFirstComment = async (videoId) => {
      const commentUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=1&order=relevance`;
      const response = await fetch(commentUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Failed to fetch comments.");
      }

      if (data.items && data.items.length > 0) {
        return data.items[0].snippet.topLevelComment.snippet.textDisplay;
      }
      return null;
    };

    const fetchDownloadLink = async () => {
      setStatus("loading");
      setErrorMessage(null);
      try {
        const videoUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&key=${API_KEY}&maxResults=1&order=date&type=video`;
        const res = await fetch(videoUrl);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error.message || "Failed to fetch video.");
        }

        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          const videoTitle = data.items[0].snippet.title;

          if (videoTitle.toLowerCase().includes("not")) {
            setStatus("patched");
            return;
          }
          const comment = await fetchFirstComment(videoId);

          if (comment) {
            const link = extractDownloadLink(comment);
            if (link) {
              setYtDownloadLink(link);
              setStatus("done");
            } else {
              setStatus("skipped");
              setErrorMessage(
                "Could not find a valid download link in the comment."
              );
            }
          } else {
            setStatus("skipped");
            setErrorMessage("No comments found for the latest video.");
          }
        } else {
          setStatus("skipped");
          setErrorMessage("No videos found for this channel.");
        }
      } catch (error) {
        console.error("Failed to fetch YouTube download link:", error);
        setErrorMessage(error.message || "An unexpected error occurred.");
        setStatus("error");
      }
    };

    fetchDownloadLink();
  }, []);

  return (
    <div
      style={{
        color: "black",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "220px",
      }}
    >
      <h3>Useful game links</h3>
      <ul>
        <li>
          {status === "loading" && <span>Getting the download link...</span>}

          {status === "patched" && (
            <span>Currently working on a new mod skin</span>
          )}

          {status === "done" && ytDownloadLink && (
            <a href={ytDownloadLink} target="_blank" rel="noopener noreferrer">
              Download Dota skins here
            </a>
          )}

          {(status === "skipped" || status === "error") && (
            <span style={{ color: "red" }}>{errorMessage}</span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Gamelinks;
