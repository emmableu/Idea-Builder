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
            name: 'asteroid',
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
        gifs: ['asteroid', 'star', 'fish', 'cats', 'pink-flower', 'brick'],
    },
    {
        name: 'Main Actors',
        gifs: ['rain'],
    },

    {
        name: 'Buttons',
        gifs: ['instruction', ]
    },
    {
        name: 'Tools/Accessories (Optional)',
        gifs: ['wings']
    }
];

export { genGifStates, gifTypes };
