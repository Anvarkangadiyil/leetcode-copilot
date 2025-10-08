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
    padding: "10px 15px",
    borderRadius: "8px",
    backgroundColor: "#673ab7",
    color: "white",
    border: "none",
    cursor: "pointer",
  });

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

