import * as apiTesterActions from './apiTesterActions';
import * as counterActions from './counterActions';
import * as loginActions from './loginActions';
import * as locationActions from './locationActions';
import * as serviceActions from './serviceActions';

const actions = {
  ...apiTesterActions,
  ...counterActions,
  ...loginActions,
  ...locationActions,
  ...serviceActions,
};

export { actions };
