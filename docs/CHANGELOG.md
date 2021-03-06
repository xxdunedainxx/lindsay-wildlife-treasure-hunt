# Changelog

## 1.2.1

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/249)
* New authentication layer + admin panel
* File Server
* Login Controller
* Wallboard Controller + UI
* Login React Form
* wallboard.sh enhancements (remote state management)

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/commit/4fd61ab6471793077a9ae924465ea8849a2756f9)
* Nginx Ingress cleanup
* Mount and persist file server uploads across docker-compose restarts

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/commit/f54252fe268d268c907d1f525bdef3531e08a6ab#diff-c9c94ddc2ec8096cea3dcc60b0fc211e8edc3e104c26977e4a56f87d21ce571fR109)
* Game display bug with submitting barcode scanner text to GameDisplay guess

## 1.1.0

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/218)
* Format updates
* Remove top message from UI and give feedback to user for right/wrong answers in form of Javascript Alert
* Add Lindsay Wildlife Folks to Email alerting (Erin + Christina). Alerts for feedback and when new app is deployed

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/223)
* Give user feedback UI when they submit request for their completion email

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/232)
* Detect if session exists and give more button options (continue/clear progress)

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/236)
* Milestone logging to gather metrics on user usage of the app

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/229)

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/230)

* CI Testing

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/231)
* Asset Availability Testing

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/233)
* (Backend) - ignore certain OS signals for process termination

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/241)
* Fix Mail Integration Test

## 1.0.0

* Nav re-sizing
* Fix up asset IDs
* Add a 'loading' delay on scan

## 0.21.1

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/209)
* Mobile Horizontal Display sizing fix

## 0.21.0

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/207)
* Fix up artifact db, prune back some artifacts
* Shorten game to certain length (7)

## 0.20.1

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/201)
* Revert to old, non-zoomable scanner

## 0.20.0

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/197)
* Lord richard avatar

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/194)
* Artifact DB Update
* Image controller

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/190)
* React client health check

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/184)
* deployment email notification

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/182)
* Dynamic config frontend

## 0.15.0

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/176)
* Manual Numpad Entry mode
* Update Artifact DB with NumberID
* Fix Manual Entry reload persistence issue

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/177)
* Zoom Optimization
* clean up barcode scanner UI (no overflow)
* detect apple device info
* switch to jsQR decode algorithm
* add Zoom component controls (play / pause)
* canvas health check
* debug mode which spits out device information
* only scan video feed if the component is mounted
* remove sx/sy division
* apply video constraints ourself
* fix detection of successful result
* request webcam permissions on home page
* docker image pruning when installing new images
* try / catch for archive logger

## 0.14.0

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/commit/494c7e1550a9ba6fb4f89becbe3dcc93875e2560)
* Custom Zoom Feature via canvas draw
* utilize qr-reader instead of ZXING
* re-uptake react-webcam

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/commit/db8b1b7a92349ae1721532172f4e54bd5ee97e23)
* Lots of cosmetic updates and proper fonts

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/161)
* Static asset hosting service

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/162)
* Log Rotator bug fix
* Properly mount './archive' dir in docker-compose

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/156)
* Add more logging and remove some verbose logging in redis

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/155)
* Report issue button bug fix

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/133)
* update run.sh to remove orphaned containers

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/131)
* Win page updates
* Win page debugger arg

## [HotPatch] 0.13.5.1

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/130)
* Bug identified in log rotator which caused backend to crash :(

## 0.13.5

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/124)
* Re-queue redis emails if email sending fails
* improve key iteration (bug)
* some documentation on redis things

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/125)
* Mount container logs on host so we have persistence and visibility on logs outside of container

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/126)
* About page updates (Zach and Rory about sections)

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/127)
* See [Issue 123](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/issues/123) for more details
* UI improvement requests from Lindsay team
* HTTP Arg parser + Debug mode HTTP arg

## 0.13.4

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/120)
* Z Scanner in favor over open source barcode scanners
* Remove scanner toggle and other two open source barcode scanners
* disable audio for video element
* 'ready for answer' btn formatting

## 0.13.3

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/119)
* Multiple Barcode scanners for testing
* Custom barcode scanner w/ ZXING barcode decoding algorithm

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/117)
* Health Monitoring Scripts

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/116)
* Load Testing Framework

[Release](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/releases/tag/mvp-0.13.3)

## 0.13.2

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/112)
* Minor UI improvements

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/113)
* Deployment updates

[Release](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/releases/tag/MVP-0.13.2)

## 0.13.1

[PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/109)

* report bug api
* report bug mail formatter and mailer
* report bug UI + HTTP client
* version bump (0.13.0 --> 0.13.1)

[Release](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/releases/tag/mvp-0.13.1)

## 0.13.0

* Fix GamePage component data loading issue [PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/105)
* Website Branding (site title, favicon) [PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/106)
* Gamepage and win display styling updates [PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/108)
* Submit user info on gamecompletion & about page [PR](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/pull/107)

[Release](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/releases/tag/mvp-0.13.0)

## 0.12.0

* Versioning support
* NavBar styling update
* Remote Log Aggregator
* Also fix issue with log 
rotation job
* game completion page fix

[Release](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/releases/tag/MVP-0.12.0)

## 0.10.1

* Released new UI version with deploy scripts: https://lindsay-wildlife-apps.zee-aws.net/ui/home

[Release](https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt/releases/tag/MVP)
