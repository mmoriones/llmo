import { useState } from "react";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
    className={`h-screen bg-white bg-white dark:bg-gray-900 shadow-[1px_0_3px_rgba(0,0,0,0.08)] p-4 flex flex-col transition-all duration-300
    ${collapsed ? "w-16" : "w-70"}`}
    >

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 text-sm border rounded px-2 py-1"
      >
        {collapsed ? ">" : "<"}
      </button>

      {/* Title */}
      {!collapsed && (
        <h1 className="text-lg font-semibold mb-6">
          LLMo
        </h1>
      )}

      {/* New Chat Button */}
      <button className="mb-4 px-3 py-2 rounded bg-black text-white">
        {collapsed ? "+" : "New Chat"}
      </button>

      {/* Chat List */}
      {!collapsed && (
        <div className="flex-1 space-y-2 text-sm">
          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
            Chat 1
          </div>

          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
            Chat 2
          </div>
        </div>
      )}

    </aside>
  );
}

export default Sidebar;
