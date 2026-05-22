import * as React from "react";

function Layout({ children }) {
    return (
        <React.Fragment>
            <div className="App">
                { children }
            </div>
        </React.Fragment>
    );
}

export default Layout;