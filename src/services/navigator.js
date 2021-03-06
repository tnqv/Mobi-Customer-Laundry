import { NavigationActions,StackActions } from 'react-navigation';

let _navigator;


function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function back(){
  _navigator.dispatch(
    NavigationActions.back(),
  );
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  );
}

function goBackToMainTabBar(params){
  Promise.all([
    _navigator.dispatch(
      StackActions.reset({
          index: 0,
          // key: keyParams,
          actions: [
            NavigationActions.navigate({
              routeName: params,
            }),
          ]
      })
    )
  ]).then(() => {})
  .catch(e => console.log(e));
}

function reset(route) {
    _navigator.dispatch(
        StackActions.reset({
          key: null,
          index: 0,
          actions: [
                {
                  type: NavigationActions.NAVIGATE,
                  routeName: route,
                },
                  // NavigationActions.navigate({
                  //     type: NavigationActions.NAVIGATE,
                  //     routeName: routeName,
                  // }),
                //   NavigationActions.navigate({
                //     type: NavigationActions.NAVIGATE,
                //     tabRoute,
                //     params,
                // })

          ]
        })
    );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  reset,
  goBackToMainTabBar,
  back,
};