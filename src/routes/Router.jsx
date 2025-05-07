import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// const UserList = lazy(() => import("../components/user/List"));
import UserList from "../components/user/List";

const routes = [
    {
        path: '/',
        element: <UserList />,
        children: [

        ]
    },
];
export default function Routes() {
    return useRoutes(routes)
}