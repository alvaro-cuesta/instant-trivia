# TODO

## Not triaged

### Bugs

### Features

- Navigation with arrow keys

### Meta

- Move visual styles out of CSS module
- Redux instead of smart components?
- Minify CSS
- Use symbols for phases and Redux action types

## Roadmap

### 1.x

- Favicon
- Error boundary
- Animation when arrows appear/disappear
- Style custom options
- Open Trivia DB license notice
- Disable delayed transitions when transitioning manually
  - E.g. if we go back from loading, do not continue to game (in this case we might even want to
    cancel request).

### 2.x

- Game end
  - Style
  - Number of won/lost
  - Can see difficulty
  - Answer status on sidebar?
    - While answering too?
    - Red/green/grey cells?
    - Click on cell takes to the answer (if game finished)?
- Categories
  - Select in custom
  - Show in cards
  - https://opentdb.com/api_category.php
  - https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE
  - https://opentdb.com/api_count_global.php


### 3.x

- Token handling
  - https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
  - https://opentdb.com/api_token.php?command=request
  - https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE

### 4.x

- Local multiplayer
