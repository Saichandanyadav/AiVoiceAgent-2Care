type SessionState = {
  step: string;
  doctor?: string;
};

const sessions: Record<string, SessionState> = {};

export const runAgent = async (input: string, sessionId: string) => {
  const text = input.toLowerCase();

  if (!sessions[sessionId]) {
    sessions[sessionId] = { step: "greet" };
  }

  const session = sessions[sessionId];

  if (session.step === "greet") {
    session.step = "symptom";
    return "Hello, welcome to 2Care.ai. I’m here to help you book a consultation. Could you please tell me what’s troubling you?";
  }

  if (text.includes("pain") || text.includes("sick") || text.includes("fever") || text.includes("stomach")) {
    session.step = "doctor";
    return "I understand, I’m sorry you’re feeling that way. Here are a few available doctors: Dr. Arjun Mehta, Dr. Sneha Reddy, and Dr. Vikram Iyer. Which one would you like to consult?";
  }

  if (text.includes("arjun") || text.includes("sneha") || text.includes("vikram") || text.includes("doctor")) {
    session.doctor = input;
    session.step = "slot";
    return `Got it. You selected ${input}. These are the available time slots: 11AM, 2PM, and 4PM. Which time works best for you?`;
  }

  if (text.includes("11am") || text.includes("2pm") || text.includes("4pm")) {
    session.step = "done";
    return `Perfect. Your appointment with ${session.doctor || "the doctor"} is confirmed for ${input}. Anything else I can help you with?`;
  }

  if (text.includes("thanks") || text.includes("thank you") || text.includes("done") || text.includes("bye")) {
    session.step = "greet";
    return "You're welcome. Take care, and feel free to reach out anytime if you need help.";
  }

  return "I’m here to help you with appointments. Could you please describe your symptoms?";
};