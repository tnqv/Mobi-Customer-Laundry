import * as apiTesterActions from './apiTesterActions';
import * as counterActions from './counterActions';
import * as loginActions from './loginActions';
import * as locationActions from './locationActions';
import * as serviceActions from './serviceActions';
import * as placedorderActions from './placedorderActions';
import * as notifications from './notifications';
import * as userLocations from './userLocation';
import * as reviewActions from './reviewActions';

const actions = {
  ...apiTesterActions,
  ...counterActions,
  ...loginActions,
  ...locationActions,
  ...serviceActions,
  ...placedorderActions,
  ...notifications,
  ...userLocations,
  ...reviewActions,
};

export { actions };
