<script>
  // import { fade } from 'svelte/transition'
  export let letter
  export let idx
  let emoji
  let word
  let char
  const letterLength = letter.length
  const shuffledIndex = []

  if (letterLength > 1) {
    for (let i = 0; i < letterLength; i++) {
      shuffledIndex.push(i)
    }

    shuffledIndex.sort(() => Math.random() - 0.5)
  } else {
    shuffledIndex.push(0)
  }

  let index = 0

  function updateLetter(letter) {
    emoji = letter.emoji
    word = letter.word
    char = word[0]
  }

  function toggleIndex() {
    const letterLength = letter.length

    if (letterLength > 1) {
      if (index === letterLength - 1) {
        index = 0
      } else {
        index += 1
      }

      updateLetter(letter[shuffledIndex[index]])
    }
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

  updateLetter(letter[shuffledIndex[index]])
</script>

<!-- -webkit-touch-callout: none; /* iOS Safari */ -->
<section
  class="flex h-screen
    w-screen touch-pan-x
    select-none flex-col items-center
    justify-center
    bg-[#494B7A]
    text-[#FFF]
    transition-all
    ease-in landscape:flex-row"
  on:touchstart|passive={swipeCard}>
  <h1
    class="m-0 mb-6
    text-center
    align-middle text-8xl capitalize
    lg:text-[220px]
    landscape:mb-0
    landscape:mr-10 landscape:w-1/4">
    {char.repeat(2)}
  </h1>
  <!-- height: 180px; -->
  <button
    class="m-0 flex
     h-2/4
    w-screen items-center
    justify-center
    text-[120px]
    transition-all active:scale-50 lg:text-[200px]
    landscape:w-1/3"
    on:click={toggleIndex}>
    <figure>
      {emoji}
      <figcaption
        class="mt-4
        text-center text-4xl
        lg:text-6xl landscape:mt-0">
        {word}
      </figcaption>
    </figure>
  </button>
</section>
