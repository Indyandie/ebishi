<script>
  export let letter
  let emoji
  let word
  let char
  let index = 0
  
  const updateLetter = letter => {
     emoji = letter.emoji
     word = letter.word
     char = word[0]
  }
  
  function toggleIndex () {
    if (index === letter.length-1) {
      index = 0
    } else {
      index += 1
    }
    updateLetter(letter[index])
  }

  toggleIndex()
</script>

<section>
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
    touch-action: pan-x;
    /* animation: test 2500ms ease-in infinite; */
    
  }

  @-webkit-keyframes test {
    50% {
      margin-left: 0;
    }
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
  }

  p {
    font-size: 48px;
  }
</style>
