"use client"; // Ensure this component runs on the client-side

interface Event {
  time: string;
  name: string;
  type: string;
}

interface EventSelectionProps {
  slotTitle?: string; // Optional slot title
  slotType?: string;
  SlotTime: string;
  events: Event[]; // Events (either Technical or Non-Technical)
  selectedEvent: string | null; // The selected event for this slot
  onSelectionChange: (selectedEvent: string | null) => void; // Callback to handle selection
}

const EventSelection: React.FC<EventSelectionProps> = ({
  slotTitle,
  SlotTime,
  slotType,
  events,
  selectedEvent,
  onSelectionChange,
}) => {
  const handleEventSelection = (eventName: string) => {
    // If the selected event is clicked again, deselect it
    if (selectedEvent === eventName) {
      onSelectionChange(null); // Deselect the current event
    } else {
      onSelectionChange(eventName); // Select the new event
    }
  };

  return (
    <div className="p-4">
      {/* Display Slot Title and Slot Time */}
      {slotTitle && (
        <h2 className="text-[#111418] text-[22px] font-bold leading-light tracking-[-0.015em] pb-3">
          <span className="text-[#111418] font-bold">
            {slotTitle}
          </span>
          <span className="text-[#888888] text-[15px] font-small ml-2">
            {SlotTime}
          </span>
        </h2>
      )}
      {/* Display Slot Type */}
      {slotType && (
        <h2 className="text-[#111418] text-[15px] font-light leading-light tracking-[-0.015em] pb-3">
          {slotType}
        </h2>
      )}

      {/* List of Events */}
      <div className="flex flex-col gap-3">
        {events.map((event, index) => (
          <label
            key={index}
            className="flex items-center gap-4 rounded-xl border border-solid border-[#dce0e5] p-[15px] flex-row-reverse cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedEvent === event.name} // Allow only one to be selected per slot
              onChange={() => handleEventSelection(event.name)} // Handle selection
              className="h-5 w-5 border-2 border-[#dce0e5] bg-transparent checked:bg-[#111418] focus:outline-none focus:ring-0 focus:ring-offset-0"
            />
            <div className="flex grow flex-col">
              <p className="text-[#111418] text-sm font-medium leading-normal">
                {event.name}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EventSelection;
