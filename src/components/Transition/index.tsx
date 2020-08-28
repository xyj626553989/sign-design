import React from 'react';

import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const Transition: React.FC<TransitionProps> = (properties) => {
  const { children, classNames, animation, ...properties_ } = properties;
  return (
    <CSSTransition {...properties_} classNames={classNames || animation}>
      {children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
export default Transition;
