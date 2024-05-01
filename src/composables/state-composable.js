import { reactive } from 'vue';
import { keyboard } from '@/utils/keyboard.js'
import { dsInstrument , dsPanels } from '@/utils/ds.settings.js'

const kb = keyboard().data

const globalState = reactive({
    instrumentDS : null,
    instrumentName: 'new instrument',
    dsInstrument: dsInstrument,
    panels: dsPanels,
    dialog: false,
    workflow: 'editor',
    zoneEditor: false,
    editorStep : 0,
    keyboard: kb,
    zone:{},
    zones:[],
    currentZone:-1,
    instrument : {
        name : 'new instrument',
        currentGroup: -1,
        currentZone: -1,
        zoneStep: -1,
        groups: [
            { 
                name : 'group 1' ,
                zones: []
            }
        ]
    }
});

export const useStatefulComposable = () => {
    const localState = reactive({
        zoneEditor: false,
        editorStep: 0
    });

    const updateValues = (zoneEditorValue, editorStepValue) => {
        // Set the global state values
        globalState.zoneEditor = zoneEditorValue;
        globalState.editorStep = editorStepValue;

        // Set the local state values
        localState.zoneEditor = zoneEditorValue;
        localState.editorStep = editorStepValue;
    };

    return {
        globalState,
        localState,
        updateValues
    };
};

