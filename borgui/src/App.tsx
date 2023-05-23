import React from 'react';
import ViewerList from "./components/ViewerList";

function App() {
    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold">Borgui</h1>
            <ViewerList/>
        </div>
    );
}

export default App;
