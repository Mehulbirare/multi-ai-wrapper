/**
 * Simple token counter estimation to keep package lightweight.
 * 1 token ~= 4 characters for English text.
 */
function estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
}

module.exports = {
    estimateTokens,
};
