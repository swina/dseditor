export const dsInstrument = {
    ui : {
        tab : {
            name: 'tab name'
        },
        button : {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            value: 0,  //The is the 0-based index of the button state that is currently selected. A value of 0 means that the first state is active.
            style: ['text','image'],
            mainImage: '',
            hoverImage: '',
            clickImage :'',
            visible: false ,
            state : {
                name : 'state',
                mainImage: '',
                hoverImage: '',
                clickImage :'',
            }
        }
    },
    groups : {
        volume: { type: 'range' , min: -50, max: 50, default: 0 , um : 'dB' },
        globalTuning: 0,
        glideTime: 0.0,
        glideMode: ['legato','always','off'],
        group: {
            enabled: { label: 'Enabled' , type: 'checkbox' , default: true },
            volume: { label: 'Volume' ,type: 'range' , min: -50, max: 50, default: 0 , um : 'dB' },
            ampVelTrack:  { label: 'Amp V Track' , type: 'checkbox' , default: true },
            groupTuning: { label : 'Gr. Tuning' , type: 'range' , min: -12, max: 12 , default: 0 }
        },
        zone : {
            sample: { label: 'Sample' , type: 'file' , default: 'sample path' },
            rootNote: { label: 'Root Note', type: 'zone-input' , default: 0 , data: { value: 0 , name: 'C' } , action: 'rootName' },
            loNote: { label: 'Lo Note' , type: 'zone-input' , default: 1, min:0, max:127 , data: { value: 0 , name: 'C' } , action: 'loNoteName'  },
            hiNote: { label: 'Hi Note' , type: 'zone-input' , default: 2, min:0, max:127 , data: { value: 0 , name: 'C' } , action: 'hiNoteName'},
            loVel : { label: 'Lo Vel', type: 'range' , default: 0, min:0, max:127 },
            hiVel : { label: 'Hi Vel',type: 'range' , default: 0, min:0, max:127 },
            start : { label: 'Start',type: 'int' , default: 0 },
            end : { label: 'End',type: 'int' , default: 0 },
            tuning: { label: 'Tuning', type: 'range' , min: -12, max: 12, default: 0.0 },
            volume : { label: 'Volume', type: 'range' , min: -50, max: 50, default: 0 , um : 'dB' },
            pan : { label: 'Pan' , type: 'range' , min: -100, max: 100, default: 0 , um : '' },
            pitchKeyTracking: { type: 'dec' , min: 0 , max: 1},
            trigger : [ 'attack', 'release', 'first','legato'],
            tags: { type: 'list' },
            playBackMode: [ 'auto', 'memory', 'disk_streaming'],
            looping : {
                loopStart: 0,
                loopEnd : null,
                loopCrossFade: 0,
                loopCrossFadeMode : ['equal_power','linear'],
                loopEnabled: true
            },
            asdr :{
                attack: 0,
                decay: 0,
                sustain: 0,
                release: 0,
                attackCurve:    { type: 'range' , min:-100, max:100, default: 0 },
                decayCurve:     { type: 'range' , min:-100, max:100, default: 0 },
                releaseCurve :  { type: 'range' , min:-100, max:100, default: 0 }
            },
            roundRobin: {
                seqMode : ['always','round_robin','random','true_random'],
                seqLength : 0,
                seqPosition: 1
            },
            seqMode : { label: 'Seq. Mode' , type: 'select' , values : ['always','round_robin','random','true_random'] , default: 'always' },
            seqLength : { label: 'Seq. Len' , type: 'int' , default: 1 },
            seqPosition: { label: 'Seq. Pos' , type: 'int' , default: 1 }
        }
    }
}

export const groupPanels = {
    title : 'Group settings',
    controls : [
        { label: 'Enabled' , ref: dsInstrument.groups.group.enabled },
        { label: 'Volume' , ref: dsInstrument.groups.group.volume },
        { label: 'Vel Track', ref: dsInstrument.groups.group.ampVelTrack },
        { label: 'Gr Tuning' , ref: dsInstrument.groups.group.groupTuning }
    ]
}
export const groupSample = {
    title: 'Sample' ,
    panels : [
        { 
            title : 'Mapping' ,
            controls: [
                { label : 'Root note' , ref : dsInstrument.groups.zone.rootNote },
                { label : 'Lo note' , ref : dsInstrument.groups.zone.loNote },
                { label : 'Hi note' , ref : dsInstrument.groups.zone.hiNote },
            ]
        },
        {
            title: 'Settings',
            controls : [
                { label: 'Volume' , ref: dsInstrument.groups.zone.volume },
                { label: 'Pan' , ref: dsInstrument.groups.zone.pan },
                { label: 'Lo Vel' , ref: dsInstrument.groups.zone.loVel },
                { label: 'Hi Vel' , ref: dsInstrument.groups.zone.hiVel }
            ]
        }

    ]
}

export const panelsControls = {
    group : [
        {
            title: 'Group Settings',
            controls : [
                'enabled' , 'volume' , 'ampVelTrack' , 'groupTuning'
            ]
        }
    ],
    zone : [
        // {
        //     title: 'Sample',
        //     controls: [ 'sample' ]
        // },
        {
            title: 'Mapping',
            controls: [
                'sample', 'rootNote' , 'loNote' , 'hiNote'
            ]
        },
        {
            title: 'Settings',
            controls: [
                'volume' , 'pan' , 'loVel' , 'hiVel'
            ]
        },
        {
            title: 'Round Robin',
            controls : [
                'seqPosition' , 'seqLength' , 'seqMode'
            ]

        }
    ]
}

export const dsPanels = {
    group : groupPanels,
    sample: groupSample
}