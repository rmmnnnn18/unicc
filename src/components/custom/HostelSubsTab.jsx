"use client";

export default function HostelSubTabs({
  HostelActiveSubTab,
  setHostelActiveSubTab
}) {
  return (
    <div className="flex w-full mb-4">
      <button 
        onClick={() => setHostelActiveSubTab("mess")}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          HostelActiveSubTab === "mess" 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Mess
      </button>
      
      <button 
        onClick={() => setHostelActiveSubTab("laundry")}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          HostelActiveSubTab === "laundry" 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Laundry
      </button>
    </div>
  );
}