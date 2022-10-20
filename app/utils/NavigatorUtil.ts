import { createNavigationContainerRef } from '@react-navigation/core';
import { CommonActions, StackActions } from '@react-navigation/routers';

/**
 * Creates a ref that can be used to navigate to a new screen.
 * @returns {React.RefObject<NavigationContainerRef>} - A ref that can be used to navigate to a new screen.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Checks if the navigation is not ready, wait 50 milliseconds and try again, otherwise call the callback
 * function.
 * @param {() => void} moveCallback - This is the function that will be called when the navigation is
 * ready.
 * @returns None
 */
function navigationCheck(moveCallback: () => void): void {
  if (!navigationRef.isReady()) {
    setTimeout(() => navigationCheck(moveCallback), 50);
  } else {
    moveCallback?.();
  }
}

/**
 * It pops the current screen from the navigation stack
 * @param {number} [screenCount=0] - the number of screens to pop.
 * @param {boolean} [isPopToTop=false] - If true, the navigation stack will be popped to the top.
 * @returns None
 */
export function navigatePop(screenCount: number = 0, isPopToTop: boolean = false): void {
  navigationCheck(() => {
    const popAction = isPopToTop ? StackActions.popToTop() : StackActions.pop(screenCount);
    navigationRef.dispatch(popAction);
  });
}

/**
 * Navigates back one screen in the navigation history.
 * @returns None
 */
export function navigateBack(): void {
  navigationCheck(() => {
    const backAction = CommonActions.goBack();
    navigationRef.dispatch(backAction);
  });
}

/**
 * It will replace the current screen with the screen you want to navigate to
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params={}] - This is an object that contains the parameters you want to pass to the next screen.
 * @returns None
 */
export function navigateWithReplace(routeName: string, params = {}): void {
  navigationCheck(() => {
    const replaceAction = StackActions.replace(routeName, params);
    navigationRef.dispatch(replaceAction);
  });
}

/**
 * Navigates to the given routeName with the given params.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is the object that contains the parameters that you want to pass to the next
 * screen
 * @param {boolean} [merge=false] - whether or not to merge the params with the existing params
 * @returns None
 */
export function navigateWithParam(routeName: string, params = {}, merge: boolean = false): void {
  navigationCheck(() => {
    const navigateAction = CommonActions.navigate({
      name: routeName,
      params,
      merge
    });
    navigationRef.dispatch(navigateAction);
  });
}

/**
 * Navigate to a new route with a push action.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is an object that contains the parameters you want to pass to the next screen
 * @returns None
 */
export function navigateWithPush(routeName: string, params = {}): void {
  navigationCheck(() => {
    const pushAction = StackActions.push(routeName, params);
    navigationRef.dispatch(pushAction);
  });
}

/**
 * It resets the navigation stack to the given routeName with the given params.
 * @param {string} stackName - The name of the stack you want to navigate to
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is an object that contains the parameters that you want to pass to the next
 * screen.
 * @returns None
 */
export function navigateWithReset(stackName: string, routeName: string, params = {}): void {
  navigationCheck(() => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: stackName,
          state: { routes: [{ name: routeName, params }] }
        }
      ]
    });
    navigationRef.dispatch(resetAction);
  });
}
