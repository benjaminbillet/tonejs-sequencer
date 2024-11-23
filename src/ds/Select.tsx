import React from 'react';
import { Select as AntdSelect } from 'antd';
import clsx from 'clsx';

import styles from './Select.module.css';

export interface SelectProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  options: { value: string; label: React.ReactNode }[];
}

export function Select({ onChange, value, className, options }: SelectProps) {
  return (
    <AntdSelect
      options={options}
      onChange={onChange}
      value={value}
      className={className}
      rootClassName={styles.root}
      popupClassName={styles.popup}
    />
  );
}
