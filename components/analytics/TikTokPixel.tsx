'use client';

import Script from 'next/script';

/**
 * TikTok Pixel for browser-side page view and conversion tracking.
 *
 * TikTok tracks URL changes in single-page apps automatically, so the base
 * pixel only needs to be loaded once for the whole site.
 */
export default function TikTokPixel() {
  const pixelId =
    process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || 'D8DLU1JC77UAEKHUI7L0';

  if (!/^[a-z0-9]+$/i.test(pixelId)) return null;

  return (
    <Script
      id="tiktok-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];
  ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
  ttq.setAndDefer = function (target, method) {
    target[method] = function () {
      target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (var i = 0; i < ttq.methods.length; i++) {
    ttq.setAndDefer(ttq, ttq.methods[i]);
  }
  ttq.instance = function (pixelId) {
    var instance = ttq._i[pixelId] || [];
    for (var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(instance, ttq.methods[i]);
    }
    return instance;
  };
  ttq.load = function (pixelId, options) {
    var url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
    ttq._i = ttq._i || {};
    ttq._i[pixelId] = [];
    ttq._i[pixelId]._u = url;
    ttq._t = ttq._t || {};
    ttq._t[pixelId] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[pixelId] = options || {};
    var script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url + '?sdkid=' + pixelId + '&lib=' + t;
    var firstScript = d.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };
  ttq.load('${pixelId}');
  ttq.page();
}(window, document, 'ttq');
        `.trim(),
      }}
    />
  );
}
