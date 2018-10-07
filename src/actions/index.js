import * as apiTesterActions from './apiTesterActions';
import * as counterActions from './counterActions';
import * as loginActions from './loginActions';

const actions = {
  ...apiTesterActions,
  ...counterActions,
  ...loginActions,
};

export { actions };
