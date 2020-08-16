import React from 'react';
import styles from './ApiError.module.css';

const ApiError = ({ error }) => <h2 className={styles.ApiError}>{error}</h2>;

export default ApiError;
