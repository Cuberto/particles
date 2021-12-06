## Cuberto Particles

## Quick start

Add css and markup to your project.

You can use `particles.scss` from demo.

```javascript
import Particles from './particles';

const demoParticles = document.querySelector('.cb-particles');
const particles = new Particles({
    container: demoParticles,
    itemsSelector: ".cb-particles-item",
});
```

### Frontend dependencies

GSAP (https://greensock.com/gsap/)

## Setup demo project

### Install

`npm install`

### Start develop server

`gulp` or `gulp serve` deploy app and start browsersync server + watchers

## Options

[gsap-ease]: https://greensock.com/docs/v3/Eases
[gsap-to]: https://greensock.com/docs/v3/GSAP/gsap.to()

| parameter | type | default | description |
| :--- | :---: | :---: | :------- |
| `container` | `HTMLElement` or `string` | `null` | particles container (required) |
| `itemsSelector` | `string` | `[data-particle-item]` | particle element selector |
| `observable` | `bool` | `true` | automatically play/stop movement if the container is not in viewport |
| `observableTarget` | `HTMLElement` | `null` | another observable element, instead of a container. |
| `observableRefresh` | `bool` | `true` | automatically refresh particles when container observe. |
| `repeats` | `number` | `-1` | number of repeats; -1 is infinite |
| `timeScale` | `number` | `1` | initial timescale |
| `initialSeek` | `number` | `1500` | seek timeline to time on first start (not used when repeats > -1) |
| `fadeInDuration` | `number` | `0.7` | duration of fade in (0 disable). |
| `fadeInEase` | `string` | `"power1.out"` | fade in ease (see [gsap easing][gsap-ease]) |
| `fadeOutDuration` | `number` | `0.7` | duration of fade out (0 disable). |
| `fadeOutEase` | `string` | `"power1.out"` | fade out ease (see [gsap easing][gsap-ease]) |
| `yStart` | `number` or `function` | `containerHeight` | start y-coordinate |
| `yEnd` | `number` or `function` | `-particleHeight` | end y-coordinate |
| `xStart` | `number` or `function` | `undefined` | start x-coordinate |
| `xEnd` | `number` or `function` | `undefined` | end x-coordinate |
| `ease` | `string` | `"none"` | particle movement ease (see [gsap easing][gsap-ease]) |
| `duration` | `function`, `number` or `string` | `gsap.utils.random(5, 10)` | duration of each particle (see [gsap duration][gsap-to])
| `offset` | `function` | `gsap.utils.random(0, 20)` | function that returns time offset of each particle |

### Methods

```javascript
const particles = new Particles({
    container: demoParticles,
    itemsSelector: ".cb-demo-particle",
});

// Start particles
particles.start();

// Stop particles
particles.stop();

// Bind observer to target
particles.observe(target);

// Destroy observer
particles.unobserve();

// Speedup to 2x
particles.setTimeScale(2);

// Reverse particles direction
particles.setReversed(true);

// Check is reversed (return bool)
particles.isReversed();

// Get GSAP timeline object
particles.getTimeline();

// Refresh particles
particles.refresh();

// Destroy particles
particles.destroy();
```

## File structure
```bash
├── /tmp/                       # Temporary served files
└── /src/                       # The source code of the application
    ├── /js/                    # JavaScript source
        └── particles.js        # Library main
    ├── /pug/                   # Pug templates
        └── /_includes/         # Pug partials
    ├── /scss/                  # SCSS styles
        └── particles.scss      # Library additional css
    ├── /static/                # Static files (fonts, images, videos, etc..)
```

