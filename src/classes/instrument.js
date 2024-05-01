"use strict";

export default class Intrument {
    constructor(){
        this.id = this.randomID()
        this.name = 'New DS Instrument'
        this.zone = []
        this.groups = []
        this.workflow = {
            noteStep : 0,
            currentGroup: 0,
            currentZone: 0,
            panel:null
        }
        this.controls = {
            volume: null,
            pan: null,
            rootNote: null,
            loNote: null,
            hiNote: null
        },
        this.data = { data : { value: null , name : null } }
        this.stepNotes = [ 'rootNote' , 'loNote' , 'hiNote' ]
    }

    Group(){
        return { 
                group : this.GroupControls(),
                zones : [ this.Controls() ] 
        }
        
    }

    Zone(){
        return this.Controls()
    }

    GroupControls(){
        return {
            name        : this.Name(),
            label       : this.Label(),
            enabled     : this.Enabled(),
            volume      : this.Volume(),
            ampVelTrack : this.AmpVelTrack(),
            groupTuning : this.GroupTuning(),
            seqMode     : this.SeqMode(),
            seqLength   : this.SeqLength(),
            seqPosition : this.SeqPosition()

        }
    }

    CreateZone(){
        return this.groups.zones = [ ...this.groups.zones , this.Controls() ]
    }

    Controls(){
        return {
            path        : this.Sample(),
            volume      : this.Volume(),
            pan         : this.Pan(),
            rootNote    : this.RootNote(),
            loNote      : this.LoNote(),
            hiNote      : this.HiNote(),
            tuning      : this.Tuning(),
            loVel       : this.LoVel(),
            hiVel       : this.HiVel()
        }
    }

    Control(control,param){
        return control == 'volume' ? this.Volume() :
            control == 'note' ? this.Note(param) : 
            control == 'rootNote' ? this.RootNote() : 
            control == 'rootNote' ? this.RootNote() : 
            control == 'pan' ? this.Pan() : 
            control == 'loVel' ? this.LoVel() : 
            control == 'hiVel' ? this.LoVel() : 
            null

    }

    Name(){
        return { label: 'Name' , type: 'input' , default: 'name' }
    }

    Label(){
        return { label: 'Label', type: 'input' , default: 'label'}
    }

    Enabled( ){
        return { label: 'Enabled' , type: 'checkbox' , default: true }
    }

    AmpVelTrack(){
        return { label: 'Amp V Track' , type: 'checkbox' , default: true }
    }

    GroupTuning(){
        return  { label : 'Gr. Tuning' , type: 'range' , min: -12, max: 12 , default: 0 }
    }


    Sample(){
        return { label: 'Sample' , type: 'input' , default: 'samples/' }
    }

    Volume(){
        return { label: 'Volume' , type: 'range' , default: 0 , min : '-120' , max: '100' , um: 'dB' }
    }

    Pan(){
        return { label: 'Pan' , type: 'range' , default: 0 , min : '-100' , max: '100' , um: 'L/R' }
    }

    Note(param){
        if ( param == 'rootNote' ) return this.RootNote()
        if ( param == 'loNote') return this.LoNote()
        if ( param == 'hiNote') return this.HiNote()
    }

    Range(param){
        return { 
            label: param?.label ? param.label : '' , 
            type: 'range' , 
            default: param?.defaul ? param.default : 0 , 
            min: param?.min ? param.min : 0 , 
            max: param?.max ? param.max : 100,
            um: param?.um ? param.um : ''
        }
    }

    RootNote(){
        return { label: 'Root Note' , type: 'note-input' , default: 24 , name: 'C0' , data : { value: 24 , name: 'C0'} }
    }

    LoNote(){
        return { label: 'Lo Note' , type: 'note-input' , default: 12 , name: 'C-1' , data : { value: 12 , name: 'C-1'}}
    }
    HiNote(){
        return { label: 'Hi Note' , type: 'note-input' , default: 36 , name: 'C1' , data : { value: 36 , name: 'C1'}}
    }

    Tuning(){
        return { label: 'Tuning' , type: 'range' , default: 0.00 , min:-120.00 , max: 120.00, step: 0.01 }
    }

    LoVel(){
        return  { label: 'Lo Vel', type: 'range' , default: 0, min:0, max:127   }
    }

    HiVel(){
        return  { label: 'Hi Vel', type: 'range' , default: 127, min:0, max:127  }
    }

    SeqMode(){
        return { label: 'Seq Mode', type: 'select', default:'always' , options: [ 'always', 'round_robin', 'random' , 'true_random' ]}
    }
    
    SeqLength(){
        return { label: 'Seq Length' , type: 'number' , default: 0 }
    }

    SeqPosition(){
        return { label: 'Seq Pos' , type: 'number' , default: 1 }
    }

    controlData ( param ){
        const data = {
            label: param?.label ? param.label : '',
            type: param?.type ? param.type : 'input',
            default: param?.default ? param.default : 0,
            min: param
        } 
    }

    PanelControls(){
        return {
            sample: [
                {
                    title: 'Sample',
                    controls: [ 'path' ]
                },
                {
                    title: 'Mapping',
                    controls : ['rootNote','loNote','hiNote','tuning']
                },
                {
                    title: 'Settings',
                    controls: ['volume','pan','loVel','hiVel']
                }
            ],
            group : [
                {
                    title: 'Group name',
                    controls: [ 'name' , 'enabled' ]
                },
                {
                    title : 'Settings',
                    controls : [
                        'volume' , 'groupTuning', 'ampVelTrack'
                    ]
                },
                {
                    title : 'Sequencing',
                    controls : [
                        'seqMode' , 'seqLength' , 'seqPosition'
                    ]
                }
            ]
        }
    }

    Panels(){
        return {
            sample : [
                {
                    title: 'Settings',
                    controls: [
                        this.Volume() , this.Pan() , this.LoVel() , this.HiVel()
                    ]
                }
            ]
        }
    }

    data(){
        return { data : { value: 0 , name : ''}}
    }

    randomID(){
        return 'ds-editor-' + Math.random().toString(36).substr(2, 5)
    }
}