import {handleBeta} from '../lib/beta-handler.mjs';
// Vercel Node.js Web Standard handler; secrets are read at request time only.
export default {fetch(request) {return handleBeta(request);}};
