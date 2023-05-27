import { useEffect, useRef } from 'react';
import _ from 'lodash';

export const useOnUnmount = (fn) => {
  const fnRef = useRef();
  fnRef.current = fn;

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export const useOnMount = (fn) => {
  const fnRef = useRef();

  useEffect(() => {
    if (!fnRef.current) {
      fn();
      fnRef.current = true;
    }
  }, []);
};

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value?.toString(16)}`?.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name, props) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      ...props,
    },
    children: _.isEmpty(name?.split(' ')[1])
      ? `${name?.split(' ')[0][0]?.toUpperCase()}`
      : `${name?.split(' ')[0][0]?.toUpperCase()}${name
          ?.split(' ')[1][0]
          ?.toUpperCase()}`,
  };
};

export const string2Initial = (name, props) => {
  return {
    sx: {
      ...props,
    },
    children: _.isEmpty(name.split(' ')[1])
      ? `${name.split(' ')[0][0].toUpperCase()}`
      : `${name.split(' ')[0][0].toUpperCase()}${name
          .split(' ')[1][0]
          .toUpperCase()}`,
  };
};

export const isEllipsisActive = (element) => {
  if (element.clientWidth < element.scrollWidth) {
    var style = element.currentStyle || window.getComputedStyle(element);
    return style.textOverflow === 'ellipsis';
  }
  
  return false;
};
