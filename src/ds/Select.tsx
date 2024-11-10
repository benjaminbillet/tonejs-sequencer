import React from 'react';
import { Select as AntdSelect } from 'antd';
import clsx from 'clsx';

import styles from './Select.module.css';

export interface SelectProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  options: { value: string; label: React.ReactNode }[];
  disabled?: boolean;
  noArrow?: boolean;
}

export function Select({ onChange, value, className, options, disabled, noArrow }: SelectProps) {
  return (
    <AntdSelect
      options={options}
      onChange={onChange}
      value={value}
      rootClassName={clsx(styles.root, className)}
      popupClassName={styles.popup}
      disabled={disabled}
      suffixIcon={noArrow ? null : undefined}
      listHeight={190}
    />
  );
}
