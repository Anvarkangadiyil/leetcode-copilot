interface LeetCodeData {
    problemDescription: string;
    userCode: string;
}

function extractLeetCodeData(): LeetCodeData {
    const data: LeetCodeData = {
        problemDescription: '',
        userCode: ''
    };

    // Extract problem description - updated selectors based on your HTML
    const problemSelectors: string[] = [
        'div.elfjS[data-track-load="description_content"]', // Most specific - matches your HTML exactly
        '.elfjS[data-track-load="description_content"]',    // Alternative
        '[data-track-load="description_content"]',          // Fallback 1
        '.elfjS',                                          // Fallback 2
        '.question-content__JfgR',                         // Other LeetCode versions
        '.css-q9q85c',
        '[data-cy="question-detail-main-tabs"] div[role="tabpanel"]'
    ];

    for (const selector of problemSelectors) {
        const element: Element | null = document.querySelector(selector);
        if (element) {
            // Get clean text content
            const textContent = (element as HTMLElement).innerText || element.textContent || '';
            
            // Ensure we have substantial content (more than just whitespace)
            if (textContent.trim().length > 50) {
                data.problemDescription = textContent.trim();
                console.log('Found description using selector:', selector);
                break;
            }
        }
    }

    // Extract user code - try multiple selectors for Monaco/CodeMirror editors
    const codeSelectors: string[] = [
        '.monaco-editor .view-lines',
        '.CodeMirror-code',
        'textarea[data-testid="code-area"]',
        '.ace_content',
        '.ace_text-input'
    ];

    for (const selector of codeSelectors) {
        const element: Element | null = document.querySelector(selector);
        if (element) {
            if (selector.includes('monaco')) {
                // Monaco editor
                const viewLines: NodeListOf<Element> = element.querySelectorAll('.view-line');
                data.userCode = Array.from(viewLines)
                    .map((line: Element) => line.textContent || '')
                    .join('\n');
            } else if (selector.includes('CodeMirror')) {
                // CodeMirror editor
                data.userCode = element.textContent || '';
            } else {
                // Textarea or other
                data.userCode = (element as HTMLTextAreaElement).value || element.textContent || '';
            }
            
            if (data.userCode.trim()) {
                console.log('Found code using selector:', selector);
                break;
            }
        }
    }

    // Fallback for code extraction
    if (!data.userCode) {
        const textareas: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll('textarea');
        for (const textarea of textareas) {
            if (textarea.value && textarea.value.length > 10) {
                data.userCode = textarea.value;
                console.log('Found code using textarea fallback');
                break;
            }
        }
    }

    console.log('Extracted data:', data);
    return data;
}

// Alternative function that specifically targets the structure you showed
function extractLeetCodeDescription(): string {
    // Try the most specific selector first
    const specificSelector = 'div.elfjS[data-track-load="description_content"]';
    const element = document.querySelector(specificSelector) as HTMLElement;
    
    if (element) {
        // Extract text content while preserving some structure
        let description = '';
        
        // Get all paragraphs within the description
        const paragraphs = element.querySelectorAll('p');
        if (paragraphs.length > 0) {
            description = Array.from(paragraphs)
                .map(p => p.innerText || p.textContent || '')
                .filter(text => text.trim().length > 0)
                .join('\n\n');
        } else {
            // Fallback to full text content
            description = element.innerText || element.textContent || '';
        }
        
        return description.trim();
    }
    
    // Fallback selectors
    const fallbackSelectors = [
        '[data-track-load="description_content"]',
        '.elfjS',
        '.description'
    ];
    
    for (const selector of fallbackSelectors) {
        const el = document.querySelector(selector) as HTMLElement;
        if (el) {
            const text = el.innerText || el.textContent || '';
            if (text.trim().length > 50) {
                return text.trim();
            }
        }
    }
    
    return '';
}

// Function to extract and clean the problem description
function getCleanProblemDescription(): string {
    const description = extractLeetCodeDescription();
    
    // Clean up common LeetCode formatting issues
    return description
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\n\s*\n/g, '\n\n') // Clean up multiple newlines
        .replace(/^\s+|\s+$/g, '') // Trim whitespace
        .replace(/Example \d+:/g, '\n\nExample $&:') // Format examples better
        .replace(/Constraints:/g, '\n\nConstraints:') // Format constraints better
        .replace(/Follow up:/g, '\n\nFollow up:'); // Format follow-up better
}

export { extractLeetCodeData, extractLeetCodeDescription, getCleanProblemDescription, type LeetCodeData };