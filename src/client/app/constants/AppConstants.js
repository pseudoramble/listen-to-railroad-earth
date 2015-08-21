import pkg from '../../package';

export const DEBUG = (process.env.NODE_ENV !== 'production');
export const APP_TITLE = pkg.name;
export const GET_SHOWS = "GET_SHOWS";
export const SHOW_ADDED = "SHOW_ADDED";
