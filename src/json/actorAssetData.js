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
            name: 'fish',
            states: ['fish1.png', 'fish2.svg', 'fish3.svg'],
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
        gifs: ['brick', 'fish'],
    },
    {
        name: 'Main Actors',
        gifs: ['panda'],
    },
];

export { genGifStates, gifTypes };
