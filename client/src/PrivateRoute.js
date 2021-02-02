import React from 'react';
import { Route, } from 'react-router-dom';

const PrivateRoute = (prop) => {
    const permissions = prop.permissions;
    const permission = prop.permission ? prop.permission : {};
    if (prop) {
        let isAccessible = !prop.permission;
        const p = permissions[permission.name];
        if (p) permission.level.forEach(r => p === r ? isAccessible = true : null);
        if (isAccessible) {
            return (
                <Route
                    path={prop.path}
                    exact={prop.exact}
                    name={prop.name}
                    render={props =>
                        <prop.component {...prop} {...props} />
                    }
                />
            )
        }
        return null;
    }
}

export default PrivateRoute;