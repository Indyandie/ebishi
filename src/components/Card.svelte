<script>
  import { fade } from 'svelte/transition'
  export let letter
  export let idx
  let emoji
  let word
  let char
  let index = 0

  const updateLetter = letter => {
    emoji = letter.emoji
    word = letter.word
    char = word[0]
  }

  function toggleIndex() {
    if (index === letter.length - 1) {
      index = 0
    } else {
      index += 1
    }
    updateLetter(letter[index])
  }

  const minSwipeChange = 44
  const swipeCard = e => {
    const card = e.target
    let scrollCurr = window.innerWidth * idx

    let touchstartX = e.changedTouches[0].screenX
    let tcMoveStart = touchstartX
    let tcCurr = 0
    let touchendX = touchstartX

    document.body.setAttribute("style", `scroll-behavior: unset;`)

    const moveCard = e => {
      tcCurr = e.changedTouches[0].screenX
      let tcMoveDiff = (tcMoveStart - tcCurr)
      // card.setAttribute("style", `transition: unset; margin-left: ${tcDiff}px`)
      document.body.scrollBy(tcMoveDiff, 0)
      tcMoveStart = tcCurr
    }

    card.addEventListener('touchmove', moveCard, { passive: true })

    const endTouch = e => {
      const touchendX = e.changedTouches[0].screenX
      checkDirection(touchendX)

      card.removeEventListener('touchmove', moveCard, { passive: true })
    }

    card.addEventListener("touchend", endTouch)

    const checkDirection = tce => {
      const tcDiff = touchstartX - tce;
      document.body.setAttribute("style", `scroll-behavior: smooth;`)

      if (Math.abs(tcDiff) > minSwipeChange) {
        // swipe left
        if (tcDiff < 0) {
          let lScroll = scrollCurr - window.innerWidth
          document.body.scrollTo(lScroll, 0)
        }

        // swipe right
        if (tcDiff > 0) {
          let rScroll = window.innerWidth + scrollCurr
          document.body.scrollTo(rScroll, 0)
        }
      } else {
        // card.scrollIntoView()
        document.body.scrollTo(scrollCurr, 0)
      }

      card.removeEventListener("touchend", endTouch)
    }
  }

  updateLetter(letter[index])
</script>

<section on:touchstart|passive={swipeCard}>
  <h1>{char.repeat(2)}</h1>
  <figure on:click={toggleIndex}>{emoji}</figure>
  <p>{word}</p>
</section>

<style>
  section {
    background-color: #494B7A;
    color: #FFF;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;
    touch-action: pan-x;
    transition: all 2s ease;
  }

  h1 {
    text-transform: capitalize;
    font-size: 120px;
    margin: 0;
  }

  figure {
    font-size: 180px;
    display: flex;
    margin: 0;
    height: 180px;
    transition: all 200ms;
  }

  figure:active {
    transform: scale(0.6);
  }

  p {
    font-size: 48px;
  }
</style>
