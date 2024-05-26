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
  class="bg-[#494B7A] text-[#FFF]
    w-screen h-screen
    flex flex-col
    justify-center
    items-center
    select-none
    touch-pan-x
    transition-all delay-[2s] ease-in"
  on:touchstart|passive={swipeCard}>
  <h1 class="capitalize text-9xl m-0 mb-6">
    {char.repeat(2)}
  </h1>
  <!-- height: 180px; -->
  <button
    class="text-[180px] m-0
    flex
    active:scale-50
    transition-all delay-100"
    on:click={toggleIndex}>
    {emoji}
  </button>
  <p class="text-center text-4xl mt-6">
    {word}
  </p>
</section>
