<script>
  // import { fade } from 'svelte/transition'
  export let letter
  export let idx
  let emoji
  let word
  let char
  let index = 0

  const updateLetter = (letter) => {
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
  const swipeCard = (e) => {
    const card = e.target
    let scrollCurr = window.innerWidth * idx

    let touchstartX = e.changedTouches[0].screenX
    let tcMoveStart = touchstartX
    let tcCurr = 0
    // let touchendX = touchstartX

    document.body.setAttribute('style', `scroll-behavior: unset;`)

    const moveCard = (e) => {
      tcCurr = e.changedTouches[0].screenX
      let tcMoveDiff = tcMoveStart - tcCurr
      // card.setAttribute("style", `transition: unset; margin-left: ${tcDiff}px`)
      document.body.scrollBy(tcMoveDiff, 0)
      tcMoveStart = tcCurr
    }

    card.addEventListener('touchmove', moveCard, { passive: true })

    const endTouch = (e) => {
      const touchendX = e.changedTouches[0].screenX
      checkDirection(touchendX)

      card.removeEventListener('touchmove', moveCard, { passive: true })
    }

    card.addEventListener('touchend', endTouch)

    const checkDirection = (tce) => {
      const tcDiff = touchstartX - tce
      document.body.setAttribute('style', `scroll-behavior: smooth;`)

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

      card.removeEventListener('touchend', endTouch)
    }
  }

  updateLetter(letter[index])
</script>

<!-- -webkit-touch-callout: none; /* iOS Safari */ -->
<section
  class="flex h-screen
    w-screen touch-pan-x
    select-none flex-col
    items-center
    justify-center
    text-[#FFF]
    transition-all delay-[2s] ease-in"
  on:touchstart|passive={swipeCard}>
  <!-- height: 180px; -->
  <button
    class="m-0 flex
    text-[180px]
    transition-all
    drop-shadow-[0_15px_35px_rgba(255,255,255,0.35)]
    delay-100 active:scale-50"
    on:click={toggleIndex}>
    {emoji}
  </button>
  <p class="w-9/12 mt-6 text-center text-3xl">
    {word}
  </p>
</section>
