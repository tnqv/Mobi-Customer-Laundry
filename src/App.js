/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import { createStore, applyMiddleware,combineReducers} from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { MainTabBar } from './navigators/AppNavigator';
import saga from 'redux-saga';
import sagaRoot from './sagas';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// The middlewares which will be used in this App
const middlewares = [];
//Combine reducers
const reducer = combineReducers(reducers);
//Saga
const sagaMiddleware = saga();

middlewares.push(sagaMiddleware);

// if (process.env.NODE_ENV === 'development') {
//   const logger = createLogger();
//   middlewares.push(logger);
// }

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(sagaRoot);

class App extends Component {
	constructor(props) {
    super(props);

  }
  render(){
    return (
      <Provider store={store}>
        <MainTabBar/>
      </Provider>
    );
  }
}
export default App;