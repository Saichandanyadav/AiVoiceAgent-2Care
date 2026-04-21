export const tools = [
  {
    type: "function",
    function: {
      name: "bookAppointment",
      parameters: {
        type: "object",
        properties: {
          doctorId: { type: "string" },
          time: { type: "string" }
        },
        required: ["doctorId", "time"]
      }
    }
  }
];