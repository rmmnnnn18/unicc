"use client";

export default function ExamsSubTabs({
  activeSubTab,
  setActiveSubTab
}) {
  return (
    <div className="flex w-full mb-4">
      <button 
        onClick={() => setActiveSubTab("marks")}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          activeSubTab === "marks" 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Marks
      </button>
      
      <button 
        onClick={() => setActiveSubTab("schedule")}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          activeSubTab === "schedule" 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Schedule
      </button>
    </div>
  );
}