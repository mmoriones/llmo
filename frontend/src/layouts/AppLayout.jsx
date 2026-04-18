function AppLayout( {sidebar, header, children } ) {
    return(
        <div className="flex h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            {/* Sidebar */}
            {sidebar}

            {/* Main */}
            <main className="flex flex-col flex-1">
                {header}

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
                
            </main>
        </div>
    );
}

export default AppLayout;