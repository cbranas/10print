import fs from 'fs'
import stringWidth from 'string-width'

let characters = ''

try {
  const data = fs.readFileSync('characters.txt', 'utf8')
  characters = data.toString()
} catch (err) {
  console.error(err)
}

const w = process.stdout.columns
const arr = [...characters];

let j = 0
let threshold = 0

function draw () {
  setTimeout(draw, 100)
  let output = ''
  let sw = 0

  for (let i = 0; i < w; i += sw) {

    let color = Math.random()
    let bright = `m`

    if (color > threshold) {
      
      color = Math.floor(color * threshold * 6) * 6 + 196

      if (Math.random() < 0.5) { color += 6 }
      if (Math.random() > 0.5) { bright = `;1m`}
    }
    else {
      color = Math.floor(color * 17) + 232
    }
    
    let prefix = `\u001b[38;5;${color}${bright}`

    let k = arr[Math.floor(Math.random()*arr.length)]
    sw = stringWidth(k)

    if (sw > 0 && i + sw <= w) {
      output += prefix + k + '\u001b[0m'
    }
  }
  
  j += 0.05
  threshold = Math.abs(Math.sin(j))

  console.log(output)
}

draw()
