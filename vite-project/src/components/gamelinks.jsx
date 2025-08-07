import React, { useEffect, useState } from "react";

const Gamelinks = () => {
  const [ytDownloadLink, setYtDownloadLink] = useState(null);

  const API_KEY = "AIzaSyCmkJHA60eUUM8RirRKGLobwMg_ShJIZag";
  const CHANNEL_ID = "UCFbYQycybEVQzzCp6O-FzrQ";

  useEffect(() => {
    const stripHtml = (html) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    const extractDownloadLink = (commentHtml) => {
      const text = stripHtml(commentHtml);
      const regex = /DOWNLOAD HERE\s*:[\s\S]*?(https?:\/\/[^\s]+)/i;
      const match = text.match(regex);
      return match ? match[1] : null;
    };

    const fetchFirstComment = async (videoId) => {
      const commentUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=1&order=relevance`;
      const response = await fetch(commentUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].snippet.topLevelComment.snippet.textDisplay;
      }
      return null;
    };

    const fetchDownloadLink = async () => {
      try {
        const videoUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&key=${API_KEY}&maxResults=1&order=date&type=video`;
        const res = await fetch(videoUrl);
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          const videoTitle = data.items[0].snippet.title;
          console.log(data.items);
          if (videoTitle.includes("NOT")) {
            return;
          }
          const comment = await fetchFirstComment(videoId);

          if (comment) {
            const link = extractDownloadLink(comment);
            if (link) setYtDownloadLink(link);
          }
        }
      } catch (error) {
        console.error("Failed to fetch YouTube download link:", error);
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
          <a
            href={ytDownloadLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {ytDownloadLink
              ? "Download Dota skins here"
              : "Mod skin is still being updated"}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Gamelinks;
