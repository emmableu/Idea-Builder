import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import ProjectDrawer from "../Project/ProjectDrawer";
import DashboardPage from "./DashboardPage";
import ProjectPageContainer from "../Project/ProjectPageContainer";

const Dashboard = () => {
    let match = useRouteMatch();

    return (
        <div>
            {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:_id`}>
                    <ProjectPageContainer />
                </Route>
                <Route path={match.path}>
                    <DashboardPage />
                </Route>
            </Switch>
        </div>
    );
}

export default Dashboard;
