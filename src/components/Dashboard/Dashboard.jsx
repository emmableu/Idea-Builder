import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import BoardDrawer from "../Board/BoardDrawer";
import DashboardPage from "./DashboardPage";

const Dashboard = () => {
    let match = useRouteMatch();

    return (
        <div>
            {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:projectUUID`}>
                    <BoardDrawer />
                    `${match.path}`
                </Route>
                <Route path={match.path}>
                    <DashboardPage />
                </Route>
            </Switch>
        </div>
    );
}

export default Dashboard;
