import pkg from '../../package';

export const DEBUG = (process.env.NODE_ENV !== 'production');
export const APP_TITLE = pkg.name;
export const GET_SHOW = "GET_SHOW";
export const SHOW_ADDED = "SHOW_ADDED";

export const GET_SETLIST = "GET_SETLIST";
export const SETLIST_ADDED = "SETLIST_ADDED";
