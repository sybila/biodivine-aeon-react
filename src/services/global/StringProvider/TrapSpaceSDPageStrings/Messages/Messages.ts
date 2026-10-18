import type { MessagesInt } from './MessagesInt';

class Messages implements MessagesInt {

    public invalidStableMotifNoTrapSpaces() {
        return "Internal Error: This stable motif doesn't have any available trap spaces. Please try to reopen Trap Space Succession Diagram page."
    }
}

export default Messages;