// keyboard.js
import { ref, onMounted, onUnmounted } from 'vue'

const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
const keys = 12
const zone = {
    name: 'C',
    root: 0,
    rootName: 'C',
    loNote: -1,
    loNoteName: '',
    hiNote: -1,
    hiNoteName: '',
    volume: 0,
    pan:0,
    loVelocity: 0,
    hiVelocity: 127,
    start:-1,
    end:-1,
    loop:0,
    sequence: 1
}
const octaves = 10
const startOctave = -2

const data = {
    notes: notes,
    keys: keys,
    octaves: octaves,
    start: startOctave,
    zone: zone,
    zones : [],
    message: 'Decent Sampler - Editor'
}
export function keyboard (){
    return { data }
}

export function getKeyColor(k,zone){
    if ( zone ){
        if ( zone.rootNote.data.value == k ){
            console.log ( k )
            return 'bg-red-400'
        }
        if ( k == zone.loNote.data.value ) return 'bg-lime-300'
        if ( k == zone.hiNote.data.value ) return 'bg-purple-300'
        if ( k > zone.loNote.data.value && k < zone.hiNote.data.value ){
            return 'bg-blue-300'
        }
    }
    return 'bg-gray-200'
}

export function whichNote (keyNumber){
    const n = keyNumber / 10
    const keyNote = n - parseInt(n)
    console.log ( keyNote , Math.round(n) )
    return keyNumber/12
}