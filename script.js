// Simple tokenization simulator for educational purposes
// This simulates how LLMs might break text into tokens

document.addEventListener('DOMContentLoaded', function() {
    const tokenizeBtn = document.getElementById('tokenize-btn');
    const userInput = document.getElementById('user-input');
    const visualization = document.getElementById('visualization');
    const originalText = document.getElementById('original-text');
    const tokenizedOutput = document.getElementById('tokenized-output');
    const tokenCount = document.getElementById('token-count');
    const generatedOutput = document.getElementById('generated-output');

    tokenizeBtn.addEventListener('click', function() {
        const text = userInput.value.trim();

        if (text === '') {
            alert('Please enter some text first!');
            return;
        }

        // Show visualization
        visualization.classList.remove('hidden');

        // Display original text
        originalText.textContent = text;

        // Tokenize the text
        const tokens = tokenizeText(text);

        // Display tokens
        displayTokens(tokens);

        // Show token count
        const charCount = text.length;
        const tokenCountNum = tokens.length;
        const ratio = (charCount / tokenCountNum).toFixed(2);

        tokenCount.innerHTML = `
            <strong>Statistics:</strong><br>
            Characters: ${charCount} |
            Tokens: ${tokenCountNum} |
            Ratio: ~${ratio} characters per token
        `;

        // Simulate output generation
        generateSampleOutput(text, tokens);

        // Scroll to visualization
        visualization.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Simple tokenization algorithm (educational simulation)
    // Real LLM tokenizers (like BPE) are more sophisticated
    function tokenizeText(text) {
        const tokens = [];

        // This is a simplified version - real tokenizers use algorithms like:
        // - Byte Pair Encoding (BPE)
        // - WordPiece
        // - SentencePiece

        // Split by spaces first
        const words = text.split(/(\s+)/);

        words.forEach(word => {
            if (word.match(/^\s+$/)) {
                // Handle whitespace
                tokens.push(word);
            } else if (word.length <= 4) {
                // Short words become single tokens
                tokens.push(word);
            } else {
                // Longer words might be split into subwords
                // This simulates how models handle unknown or complex words
                const parts = splitWord(word);
                tokens.push(...parts);
            }
        });

        return tokens;
    }

    function splitWord(word) {
        // Simple heuristic to demonstrate subword tokenization
        const tokens = [];

        // Check for punctuation at the end
        const punctMatch = word.match(/^(.+?)([.,!?;:]+)$/);
        if (punctMatch) {
            tokens.push(...splitWord(punctMatch[1]));
            tokens.push(punctMatch[2]);
            return tokens;
        }

        // Check for common prefixes
        const prefixes = ['un', 're', 'pre', 'dis', 'mis', 'over', 'under'];
        for (let prefix of prefixes) {
            if (word.toLowerCase().startsWith(prefix) && word.length > prefix.length + 2) {
                tokens.push(prefix);
                tokens.push(word.slice(prefix.length));
                return tokens;
            }
        }

        // Check for common suffixes
        const suffixes = ['ing', 'ed', 'er', 'est', 'ly', 'tion', 'ness', 'ment'];
        for (let suffix of suffixes) {
            if (word.toLowerCase().endsWith(suffix) && word.length > suffix.length + 2) {
                tokens.push(word.slice(0, -suffix.length));
                tokens.push(suffix);
                return tokens;
            }
        }

        // If word is very long, split it into chunks
        if (word.length > 8) {
            const mid = Math.floor(word.length / 2);
            tokens.push(word.slice(0, mid));
            tokens.push(word.slice(mid));
            return tokens;
        }

        // Otherwise, keep as single token
        tokens.push(word);
        return tokens;
    }

    function displayTokens(tokens) {
        tokenizedOutput.innerHTML = '';

        tokens.forEach((token, index) => {
            const tokenElement = document.createElement('span');
            tokenElement.className = 'token';

            // Display whitespace tokens differently
            if (token.match(/^\s+$/)) {
                tokenElement.textContent = '␣'; // Use visible space symbol
                tokenElement.title = 'Space/Whitespace';
                tokenElement.style.opacity = '0.6';
            } else {
                tokenElement.textContent = token;
            }

            // Add delay for animation effect
            tokenElement.style.animationDelay = `${index * 0.05}s`;

            tokenizedOutput.appendChild(tokenElement);
        });
    }

    function generateSampleOutput(inputText, tokens) {
        // Generate a sample educational response
        const responses = [
            `This text contains ${tokens.length} tokens. In a real LLM, each token would be converted to a numerical vector (embedding) and processed through transformer layers to understand context and meaning.`,

            `After tokenization into ${tokens.length} parts, the model analyzes patterns in these tokens. It considers relationships between words, grammar, and context to generate appropriate responses.`,

            `Your input was broken into ${tokens.length} tokens. The model processes these through neural networks with billions of parameters, learning patterns from vast amounts of training data to predict what comes next.`,

            `With ${tokens.length} tokens identified, the LLM uses self-attention mechanisms to weigh the importance of each token relative to others, enabling it to understand complex relationships in your text.`,

            `The tokenization produced ${tokens.length} units. Each undergoes embedding (conversion to numbers), then passes through multiple transformer layers where the model decodes meaning and generates contextually relevant output.`
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Animate the output text
        generatedOutput.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < randomResponse.length) {
                generatedOutput.textContent += randomResponse[i];
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 20);
    }

    // Add example text on page load
    userInput.value = 'The quick brown fox jumps over the lazy dog';
});

// Add some helpful tooltips and information
document.addEventListener('DOMContentLoaded', function() {
    // Add hover information to process steps
    const processSteps = document.querySelectorAll('.process-step');

    const stepInfo = [
        'You type or speak your message to the AI',
        'Text is broken into tokens - the building blocks of language processing',
        'Neural networks analyze patterns and relationships between tokens',
        'New tokens are generated one at a time to form the response'
    ];

    processSteps.forEach((step, index) => {
        step.setAttribute('title', stepInfo[index]);
    });
});
