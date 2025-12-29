# vigie-waf — Vigie Web Firewall

[中文说明](./README.CN.MD)

## What is this project
This is a cross-platform, all-in-one web defense solution written in Rust.
It aims to be extremely fast and rock-solid.

## Concurrency tests (version 1.2.3)

The following are local static resource access tests.
The defense architecture used for testing:

`vigie-waf` ===> `nginx` ===> `index.html`

### Summary

| Max concurrency | Total requests | Failure rate | p(95) latency |
|---|---:|---:|---:|
| 200 | 88,765 | 0% | 6.92ms |
| 500 | 176,176 | 0% | 125.18ms |
| 1000 | 481,326 | 0% | 410.16ms |

### 200 concurrent connections
![Custom Badge](https://img.shields.io/badge/p(95)-6.92ms-brightgreen)

![200 concurrent](./docs/assets/k6-test-200.png)

### 500 concurrent connections
![Custom Badge](https://img.shields.io/badge/p(95)-125.18ms-brightgreen)

![500 concurrent](./docs/assets/k6-test-500.png)

### 1000 concurrent connections
![Custom Badge](https://img.shields.io/badge/p(95)-410.16ms-brightgreen)

![1000 concurrent](./docs/assets/k6-test-1000.png)

## Project Architecture
![architecture](./docs/assets/core.png)

## Defense matrix + Lua scripting engine
Most of the core defense logic can be expressed as Lua scripts. Users can add custom scripts for additional defenses and control the execution order of these scripts. Current built-in modules include:

- [x] 1. Static bypass: Configure static resource paths that are ignored by defense scripts.
- [x] 2. IP blacklist: Configure blacklists that apply permanently or on a schedule.
- [x] 3. IP whitelist: Configure whitelists that apply permanently or on a schedule.
- [x] 4. CC rate limit: Configure rate limits for site access.
- [x] 5. Search engines detection: Identify mainstream search engines and verify their authenticity so that genuine crawlers can access the site while forged crawlers are added to the blacklist for 30 minutes.
- [x] 6. PoW (Proof-of-Work) defense: On first access, visitors are redirected to a lightweight loading page where the browser runs a small JS-based PoW calculation. Only clients that solve the challenge are allowed to reach the upstream server. This is an effective mitigation against many bots and can help against certain types of DDoS attacks.

## Project Progress
- [x] Core functionality implemented
- [x] Multi-process architecture
- [ ] Improve documentation
- [ ] Migrate to full in-memory shared architecture
- [ ] Other feature iterations — planned: automated certificate renewal, admin panel improvements
- [ ] Open-source the code


## How to run
### Direct download

#### Windows

1. Download the latest release from the releases page: https://github.com/pcloth/vigie-waf-rust/releases

2. Run the executable from the project root:

```
./bin/vigie-waf-rust.exe
```

#### Linux

1. Download the latest release from the releases page: https://github.com/pcloth/vigie-waf-rust/releases

2. Run the binary from the project root:

```
./bin/vigie-waf-rust
```

### Running with Docker

Because vigie-waf supports OTA upgrades, if you want to use OTA updates do not run the project directly from inside the container.
It is recommended to mount the host code directory into the container instead.

```sh
docker run -it -p 80:80 -p 443:443 \
  -v your_path:/app \
  pcloth/vigie-waf-rust:latest \
  -e ADMIN_USERNAME=admin \
  -e ADMIN_PASSWORD=admin123 \
  -e JWT_SECRET=298347sjfi#2212 \
  bash -c "export RUST_LOG=debug && /app/bin/vigie-waf-rust & while true; do echo hello world; sleep 60; done"
```

> Note: the `& while true; do echo hello world; sleep 60; done` part is added so the container does not stop while performing OTA upgrades. If you plan to perform manual upgrades, you can omit this.

Be sure to change the `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` environment variables from their defaults.


## How to configure

### Step 1

After the application is running, open your browser and visit http://localhost to see the welcome page:

![welcome](./docs/assets/welcome.png)

### Step 2

Click through to the admin login page:
![login](./docs/assets/login.png)

Log in using the credentials you configured via environment variables.

> Default username: `admin`, default password: `admin123`

### Step 3

Change your language. Currently Chinese and English are supported.
![changeLang](./docs/assets/changeLang.png)

### Step 4

Configure your site(s):
![configSite](./docs/assets/configSite.png)

### Done

Thank you for trying vigie-waf.

## Other pages screenshots

### Home
> The screenshot shows that shortly after going online, attackers were greatly reduced thanks to the applied defenses.

![home](./docs/assets/review/home.png)

### Rules
> You can add more custom defense scripts or fine-tune the default system scripts.

![rules](./docs/assets/review/rules.png)

### Whitelist
> Whitelist entries can be set with expiration times.

![ipw](./docs/assets/review/ipw.png)

### Blacklist
> Blacklist entries can be set with expiration times. Fake crawlers detected by the firewall are automatically added to the blacklist and blocked for 30 minutes.

![ipb](./docs/assets/review/ipb.png)

### Intelligent crawler defense
> Requests that declare themselves as crawlers via the User-Agent are subject to reverse DNS verification. Forged crawlers are rejected and their IP addresses are blocked for 30 minutes. The screenshot shows the UI for editing/adding/managing which crawlers are allowed.

![crawlers](./docs/assets/review/crawlers.png)

> This feature balances SEO and defense: choose which crawlers may access your site and optionally limit their crawl rate.

![crawlersEdit](./docs/assets/review/crawlersEdit.png)

### PoW (Proof-of-Work), CC defense, and static resource configuration
> Easily toggle PoW proof-of-work, enable/disable CC rate limiting and set static resource bypass rules.

![security](./docs/assets/review/security.png)

## Version upgrades
> You can perform online OTA upgrades to update to the latest version seamlessly and for free.

![update](./docs/assets/review/update.png)

