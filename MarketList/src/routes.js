import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';
import Items from './pages/Items';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
        Items,
    })
);