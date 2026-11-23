# Bot activity monitoring

Open the **Elevate Website project → Logs** in Vercel, select **Production**, and search for `elevate_security`. Set the time range to the latest 24 hours, then compare the same duration from the previous day or week. Available history depends on the Vercel plan. For longer comparisons, export counts or configure a log drain with retention and access controls.

| Surface | What the event records |
| --- | --- |
| `admin_login` | Login POST outcome, including incomplete sign-in, request rejection, rate limit or accepted login |
| `admin_api` | Unauthenticated and cross-site requests rejected by protected API handlers |
| `contact` | Contact submission outcome, including validation, rate limit, accepted submission or service error |

Each event has a date, status and reason. If the application has a strong session secret and a valid platform IP header, it adds a same-day source identifier. Use that value to group repeat requests on the same UTC date. It rotates daily and can represent a shared network. Keep the logs private. The new events omit raw IP addresses, user agents, cookies, URLs, passwords, invoice data and form contents. Existing login-attempt records and alerts are unchanged.

- Repeated incomplete logins or private API denials from the same source deserve a look. A lone 401 can be a stale login, a typo or an ordinary multi-step login. Review bursts across multiple sources as well.
- Compare 429s and rejection counts with total requests. Check **Firewall** for traffic intercepted before the application, paths outside these handlers, and spikes in bandwidth or request volume.
- Review successful logins against your expected admin activity. A spike by itself does not establish an intrusion.
- Contact rate limits are currently per process. Use a Vercel Firewall rate-limit rule for distributed enforcement on `POST /api/contact` or `POST /api/auth/login` if the observed volume warrants it. Confirm the plan supports the intended rules and check for legitimate traffic caught by them.

Baseline data begins when the change is deployed. This instrumentation records application outcomes rather than identifying individual people or classifying a request as a bot.
