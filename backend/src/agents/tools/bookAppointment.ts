export const bookAppointment = async ({ doctorId, time }: any) => {
  if (time === "10AM") {
    return { success: false, message: "Slot not available. Try 11AM" };
  }
  return { success: true, message: `Booked with ${doctorId} at ${time}` };
};