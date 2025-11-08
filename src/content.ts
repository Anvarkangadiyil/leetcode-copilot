import type { QuestionInformation } from "./types/type";

// Prevent duplicates
if (!document.getElementById("my-ai-btn")) {
  const btn = document.createElement("button");
  btn.id = "my-ai-btn";
  btn.innerText = "💡 Copilot";
Object.assign(btn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 10000,
  padding: "12px 20px",
  borderRadius: "12px",
  background: "rgba(103, 58, 183, 0.85)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  border: "1px solid rgba(255,255,255,0.2)",
  cursor: "pointer",
  transition: "all 0.25s ease",
});

btn.onmouseover = () => {
  btn.style.transform = "translateY(-3px)";
  btn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.28)";
};

btn.onmouseout = () => {
  btn.style.transform = "translateY(0)";
  btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
};


  function extractCode(htmlContent: NodeListOf<Element>) {
    // Extract the text content of each line with the 'view-line' class
    const code = Array.from(htmlContent)
      .map((line) => line.textContent || "") // Ensure textContent is not null
      .join("\n");

    return code;
  }

  btn.onclick = async () => {
    try {
      const name = getProblemName();
      const language = getProblemLanguage();
      const userCurrentCodeContainer = document.querySelectorAll(".view-line");
      const metaDescriptionEl = document.querySelector(
        "meta[name=description]"
      );
      const problemStatement = metaDescriptionEl?.getAttribute(
        "content"
      ) as string;

      const extractedCode = extractCode(userCurrentCodeContainer);

      const data: QuestionInformation = {
        id:"currentQ",
        description: problemStatement,
        name: name,
        answer: extractedCode,
        programmingLanguage: language,
      };

      await chrome.runtime.sendMessage({
        action: "SAVE_PROBLEM",
        payload: data,
      });

      const res = await chrome.runtime.sendMessage({ action: "openSidePanel" });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  document.body.appendChild(btn);
}

const getProblemName = () => {
  const url = window.location.href;
  const match = /\/problems\/([^/]+)/.exec(url);
  return match ? match[1] : "Unknown Problem";
};

const getProblemLanguage = () => {
  let programmingLanguage = "UNKNOWN";

  const changeLanguageButton = document.querySelector(
    "button.rounded.items-center.whitespace-nowrap.inline-flex.bg-transparent.dark\\:bg-dark-transparent.text-text-secondary.group"
  );

  if (changeLanguageButton) {
    if (changeLanguageButton.textContent)
      programmingLanguage = changeLanguageButton.textContent;
  }

  return programmingLanguage;
};

