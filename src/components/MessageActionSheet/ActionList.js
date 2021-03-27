import React from 'react';

import {ActionItem} from './ActionItem';

export const ActionList = React.memo(({actions}) => (
  <>
    {actions.map((action) => (
      <ActionItem {...action} key={action.id} />
    ))}
  </>
));
