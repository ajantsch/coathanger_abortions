# Coathanger Abortions

## A game that reveals what terrible people your friends really are.

https://coathanger-abortions.com

This online card game is based on the incredible [Cards Against Humanity](https://cardsagainsthumanity.com/). Due to the fact that the game is free to use under the [Creative Commons
BY-NC-SA 2.0 License](https://creativecommons.org/licenses/by-nc-sa/2.0/), I decided to create an online version of it (yes, this was motivated by the COVID-19 lockdown). The game can be
played both on mobile and on desktop, meaning it gives you the possibility to play either in isolation (video chat recommended), or whenever you and your friends get together and feel like.

## Development

### Prerequisites

- Node
- Docker

### Structure

This repo mainly consists of two parts:

- the webapp served to the player (`/app`)
- the service managing the game(s) (`/service`)

Both can be individually deployed, settings in the `config` folders of both need to be altered according to their deployment infrastructur.

### Development build

Make sure you have dependencies installed in both `app` and `service` folders

```
yarn install
```

To start the local development build of the app, just run

```
docker-compose up
```

in the root directory of this repo. The webapp will then be available via http://localhost:4040.
