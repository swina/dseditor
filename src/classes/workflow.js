/**
 * workflow.js
 * 
 * Functions to execute the application workflow (operations)
 * 
 * @const object globalState (store)
 * @const object localState (store)
 * @const function updateValues (store)
 * 
 */
import Instrument from './instrument'
import { useStatefulComposable } from '@/composables/state-composable.js';
import { keyboard , whichNote } from '@/utils/keyboard.js'

const { globalState, localState, updateValues } = useStatefulComposable();

const current = () => {
    return globalState.instrumentDS.workflow
}

const instrumentDS = () => {
    return globalState.instrumentDS
}

const currentGroup = () => {
    return instrumentDS().groups[current().currentGroup].group
}

const currentZone = () => {
    return instrumentDS().groups[current().currentGroup].zones[current().currentZone]
}

const currentSample = () => {
    return currentZone().path.default
}


const contextControls = (ctx) => {
    const panels = new Instrument().PanelControls()[ctx]
    let instrumentControls
    if ( ctx == 'sample' ){
        instrumentControls = instrumentDS().groups[current().currentGroup].zones[current().currentZone]
    }
    if ( ctx == 'group' ){
        instrumentControls = instrumentDS().groups[current().currentGroup].group
    }
    // return instrumentControls
    const panelControls = 
        panels.map ( (pn,p) => {
            const panel = {
                name: pn.title
            }
            panel.controls = pn.controls.map ( (panelControl,index) => {
                return instrumentControls[panelControl]
            })
            return panel
        })

    return panelControls
}


const addGroupZone = () =>{
    /**
    * @const object instrument
    * @const int currentGroup
    * @const int currentZone
    * @const obj new_zone
    * @const array zones
    * @function object current
    * 
    * Create new Zone for the current group
    * 
    */
    const instrument = instrumentDS()
    const currentGroup = current().currentGroup
    const currentZone = current().currentZone

    // create a new zone object from class Instrument
    const new_zone = new Instrument().Zone()
    
    // get current instrument group zones
    const zones = instrument.groups[currentGroup].zones

    // Add zone object to current group
    instrument.groups[currentGroup].zones = [ ...zones, new_zone ]

    // increment current workflow zone pointer
    instrument.workflow.currentZone++
    console.log ( instrument )
}

const mapNote = async (noteNumber,octave,name,event) => {
    /**
     * @param int noteNumber 
     * @param int octave
     * @param strint name
     * @const object instrument
     * @const string stepNote
     * @function object current
     *  
     * Add note (root/lo/hi) mapping to the current zone 
     * 
     */
    let pos = 0
    if ( event.ctrlKey && !event.shiftKey ) pos = 1
    if ( event.ctrlKey && event.shiftKey ) pos = 2

    console.log ( 'mapping note ' , noteNumber )
    const instrument = instrumentDS()
    const stepNote = instrument.stepNotes[pos]
    currentZone()[stepNote].data = {
        value : noteNumber,
        name: `${name}${octave-2}`
    }
    // _zones[current().currentZone][stepNote].data.value = noteNumber
    // _zones[current().currentZone][stepNote].data.name = `${name}${octave-2}`
}

const setZone = (zone) => {
    globalState.instrumentDS.workflow.currentZone = zone
}

const setControls = (context) => {
    instrumentDS().workflow.panel == context ?
        instrumentDS().workflow.panel = '' :
        instrumentDS().workflow.panel = context 
}

const controlPanel = (panel) => {
    return new Instrument().PanelControls()[panel]
}

const addControl = (name) => {
    const control = new Instrument.Control(name)
}


export const workflow = {
    current,
    currentGroup,
    currentZone,
    contextControls,
    currentSample,
    setZone,
    addGroupZone,
    mapNote,
    setControls,
    controlPanel
}
