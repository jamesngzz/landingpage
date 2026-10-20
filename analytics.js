import {inject} from '/vercel-analytics.js';

// Count the landing page, not its embedded demo or local development visits.
const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
if (window.self === window.top && location.protocol === 'https:' && !localHosts.has(location.hostname)) {
  inject({
    mode: 'production',
    beforeSend(event) {
      // Query strings and fragments can contain contact details. Page paths
      // still provide the visitor/page-view metrics requested for this site.
      const url = new URL(event.url);
      url.search = '';
      url.hash = '';
      return {...event, url: url.href};
    }
  });
}
