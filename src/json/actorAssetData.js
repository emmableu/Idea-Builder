import * as UUID from 'uuid';
import globalConfig from "../globalConfig";

const genGifStates = () => {
    const data = [
        {
            name: 'brick',
            states: [
                'brick1.png',
                'brick2.png',
                'brick3.png',
                'brick4.png',
                'brick5.png',
            ],
        },
        {
            name: 'rain',
            states: ['rain.png'],
        },
        {
            name: 'cloud',
            states: ['cloud.png'],
        },
        {
            name: 'asteroid-player',
            states: ['asteroid-player.png'],
        },
        {
            name: 'instruction',
            states: ['instruction.png'],
        },
        {
            name: 'cats',
            states: ['cats.png'],
        },
        {
            name: 'pink-flower',
            states: ['pink-flower.png'],
        },
        {
            name: 'asteroid-player',
            states: ['asteroid.png'],
        },
        {
            name: 'star',
            states: ["star.png"],
        },
        {
            name: 'wings',
            states: ['wings1.png', 'wings2.png'],
        },
        {
            name: 'fish',
            states: ['fish1.png', 'fish2.png', 'fish3.png'],
        },
        {
            name: 'panda',
            states: ['panda.png'],
        },
        {
            name: 'snow',
            states: ['snow1.png', 'snow2.png']
        },
        {
            name: 'dog-smile',
            states: ['dog-smile-1.png', 'dog-smile-2.png']
        },
        {
            name: 'cube',
            states: ['cube-left.png', 'cube-right.png', 'cube-up.png', 'cube-down.png']
        },
        {
            name: 'shower',
            states: ['shower.png']
        },
        {
            name: 'play-button',
            states: ['play-button.png']
        },
        {
            name: 'play-button-2',
            states: ['play-button-2.png']
        },
        {
            name: 'boat',
            states: ['boat-normal.png', 'boat-hit.png']
        },
        {
            name: 'bird',
            states: ['bird1.png', 'bird2.png', 'bird3.png', 'bird4.png', 'bird5.png']
        },
        {
            name: 'flight',
            states: ['flight.png']
        },
        {
            name: 'sticks',
            states: ['sticks1.png', 'sticks2.png']
        },
        {
            name: 'rocks',
            states: ['rocks.png', 'asteroid.png']
        },
        {
            name: 'penguin', // TODO
            states: ['penguin1.png', 'penguin2.png','penguin3.png','penguin4.png']
        },
        {
            name: 'puppy', // TODO
            states: ['puppy-white.png', 'puppy-brown.png','puppy-black.png']
        },
        {
            name: 'game-over',
            states: ['game-over.png']
        },
        {
            name: 'trees',
            states: ['trees.png']
        },
        {
            name: 'ground-trees',
            states: ['ground-trees.png']
        },
    ];
    const gifList = data.map((ele) =>
        ({
            _id: UUID.v4(),
            name:  ele.name,
            stateList: ele.states.map((item) => ({ _id: globalConfig.imageServer.sample.state  + item  + "?" + UUID.v4(),
                name: item })),
        })
    );
    console.log(gifList)
    const gifDict = {}
    for (const gif of gifList) {
        gifDict[gif.name] = gif;
    }
    return gifDict
};

const gifTypes = [
    {
        name: 'Surrounding Actors',
        gifs: [ 'snow', 'fish', 'star',  'sticks', 'trees', 'rocks', 'cloud', 'cats','pink-flower'],
    },
    {
        name: 'Main Actors',
        gifs: ['bird', 'penguin', 'flight', 'puppy', 'boat', 'shower'],
    },
    {
        name: 'Tools/Accessories',
        gifs: ['wings', 'dog-smile', 'rain', 'ground-trees']
    },

    {
        name: 'Buttons',
        gifs: ['play-button', 'play-button-2', 'game-over']
    },

];

export { genGifStates, gifTypes };
