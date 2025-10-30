# vigie-waf — vigie Web Firewall

[中文说明](./README.CN.MD)

## What is this project
This is a cross-platform, all-in-one web defense solution written in Rust.
It aims to be extremely fast and rock-solid.

## Concurrency tests (version 1.2.3)

The following are local static resource access tests.
The defense architecture used for testing:

`vigie-waf` ===> `nginx` ===> `index.html`

### 200 concurrent connections
![Custom Badge](https://img.shields.io/badge/p(95)-6.92ms-brightgreen)

![200 concurrent](./assets/k6-test-200.png)

### 500 concurrent connections
![Custom Badge](https://img.shields.io/badge/p(95)-125.18ms-brightgreen)

![500 concurrent](./assets/k6-test-500.png)

## Project Architecture
![architecture](./assets/core.png)

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
- [ ] Other feature iterations
- [ ] Open-source the code


## How to run
### Direct download

#### Windows

1. Download the latest release from the releases page: https://github.com/pcloth/vigie-waf-rust-publish/releases

2. Run the executable from the project root:

```
./bin/vigie-waf-rust.exe
```

#### Linux

1. Download the latest release from the releases page: https://github.com/pcloth/vigie-waf-rust-publish/releases

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

![welcome](./assets/welcome.png)

### Step 2

Click through to the admin login page:
![login](./assets/login.png)

Log in using the credentials you configured via environment variables.

> Default username: `admin`, default password: `admin123`

### Step 3

Change your language. Currently Chinese and English are supported.
![changeLang](./assets/changeLang.png)

### Step 4

Configure your site(s):
![configSite](./assets/configSite.png)

### Done

Thank you for trying vigie-waf.

