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
            states: ['fish1.png', 'fish2.png', 'fish3.png', 'fish4.png', 'fish5.png'],
        },
        {
            name: 'pencil',
            states: ['pencil.svg'],
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
            name: 'no-shower',
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
        {
            name: 'mouse-bubble',
            states: ['bubble.svg']
        },
        {
            name: 'scrolling-backdrop-hills',
            states: ['backdrop-hills.png'],
        },
        {
            name: 'tree-background',
            states: ['tree.png']
        },
        {
            name: 'bow',
            states: ['bow1.png', 'bow2.png', 'bow3.png']
        },
        {
            name: 'cat-animated',
            states: ['tutorial-cat1.svg', 'tutorial-cat2.svg']
        },
        {
            name: 'timer',
            states: ['alarm-clock.png']
        },
        {
            name: 'fighter-jet',
            states: ['fighter-jet-1.png', 'fighter-jet-2.png', 'fighter-jet-3.png']
        },
        {
            name: 'bullet',
            states: ['bullet1.png', 'bullet2.png']
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
    const gifDict = {}
    for (const gif of gifList) {
        gifDict[gif.name] = gif;
    }
    return gifDict
};

const gifTypes = [
    {
        'name': 'Surrounding Actors',
        'gifs': ['snow', 'fish', 'star',
            'sticks', 'trees', 'rocks', 'cube',
            'cloud', 'cats', 'pink-flower'],
    },
    {
        'name': 'Main Actors',
        'gifs': ['bird', 'fighter-jet', 'penguin',  'flight', 'no-shower', 'puppy',  'boat', 'cat-animated'],
    },
    {
        'name': 'Tools/Accessories',
        'gifs': ['timer',  'bullet', 'rain', 'pencil', 'wings',
            'mouse-bubble', 'scrolling-backdrop-hills',
            'tree-background', 'dog-smile',
            'ground-trees']
    },

    {
        'name': 'Buttons',
        'gifs': ['play-button', 'play-button-2', 'game-over', 'bow']
    },
]

const showGifMap = {'study1': ['sticks', 'cats', 'trees', 'star', 'cloud', 'flight', 'boat', 'puppy', 'no-shower', 'wings', 'ground-trees', 'pencil', 'dog-smile', 'mouse-bubble', 'play-button', 'game-over'], 'study2': ['cube', 'rocks', 'pink-flower', 'fish', 'snow', 'bird', 'cat-animated', 'penguin', 'fighter-jet', 'tree-background', 'timer', 'scrolling-backdrop-hills', 'rain', 'bullet', 'bow', 'play-button-2'], 'asheville': ['cube', 'rocks', 'sticks', 'cats', 'star', 'flight', 'penguin', 'cat-animated', 'no-shower', 'rain', 'ground-trees', 'wings', 'pencil', 'mouse-bubble', 'play-button-2', 'play-button'], 'athens': ['trees', 'cloud', 'pink-flower', 'snow', 'fish', 'bird', 'fighter-jet', 'boat', 'puppy', 'tree-background', 'scrolling-backdrop-hills', 'timer', 'bullet', 'dog-smile', 'game-over', 'bow'], 'atlanta': ['pink-flower', 'rocks', 'cloud', 'sticks', 'fish', 'puppy', 'penguin', 'fighter-jet', 'cat-animated', 'pencil', 'bullet', 'dog-smile', 'scrolling-backdrop-hills', 'ground-trees', 'game-over', 'play-button-2'], 'austin': ['trees', 'cats', 'cube', 'star', 'snow', 'flight', 'bird', 'boat', 'no-shower', 'timer', 'mouse-bubble', 'wings', 'tree-background', 'rain', 'play-button', 'bow'], 'baltimore': ['cube', 'cloud', 'star', 'pink-flower', 'snow', 'cat-animated', 'bird', 'no-shower', 'fighter-jet', 'timer', 'pencil', 'mouse-bubble', 'tree-background', 'wings', 'play-button-2', 'play-button'], 'bellevue': ['trees', 'fish', 'rocks', 'cats', 'sticks', 'boat', 'penguin', 'puppy', 'flight', 'bullet', 'rain', 'scrolling-backdrop-hills', 'dog-smile', 'ground-trees', 'bow', 'game-over'], 'boston': ['trees', 'rocks', 'star', 'snow', 'cube', 'puppy', 'flight', 'no-shower', 'fighter-jet', 'tree-background', 'dog-smile', 'bullet', 'ground-trees', 'rain', 'play-button-2', 'game-over'], 'buffalo': ['cloud', 'fish', 'sticks', 'pink-flower', 'cats', 'penguin', 'bird', 'boat', 'cat-animated', 'timer', 'pencil', 'wings', 'scrolling-backdrop-hills', 'mouse-bubble', 'play-button', 'bow'], 'cambridge': ['snow', 'rocks', 'cloud', 'star', 'trees', 'penguin', 'flight', 'boat', 'cat-animated', 'dog-smile', 'rain', 'ground-trees', 'timer', 'pencil', 'game-over', 'bow'], 'charleston': ['pink-flower', 'sticks', 'fish', 'cube', 'cats', 'bird', 'no-shower', 'puppy', 'fighter-jet', 'tree-background', 'bullet', 'mouse-bubble', 'wings', 'scrolling-backdrop-hills', 'play-button', 'play-button-2'], 'chicago': ['cloud', 'fish', 'star', 'trees', 'snow', 'cat-animated', 'flight', 'penguin', 'no-shower', 'tree-background', 'scrolling-backdrop-hills', 'dog-smile', 'mouse-bubble', 'timer', 'play-button-2', 'bow'], 'cincinnati': ['cats', 'sticks', 'cube', 'pink-flower', 'rocks', 'boat', 'puppy', 'fighter-jet', 'bird', 'rain', 'wings', 'pencil', 'ground-trees', 'bullet', 'play-button', 'game-over'], 'cleveland': ['star', 'cloud', 'fish', 'pink-flower', 'sticks', 'cat-animated', 'no-shower', 'flight', 'puppy', 'timer', 'wings', 'bullet', 'ground-trees', 'dog-smile', 'bow', 'play-button-2'], 'fremont': ['cats', 'rocks', 'trees', 'cube', 'snow', 'boat', 'penguin', 'bird', 'fighter-jet', 'scrolling-backdrop-hills', 'pencil', 'tree-background', 'rain', 'mouse-bubble', 'game-over', 'play-button'], 'greenwich': ['rocks', 'sticks', 'pink-flower', 'star', 'trees', 'fighter-jet', 'boat', 'flight', 'cat-animated', 'timer', 'scrolling-backdrop-hills', 'bullet', 'dog-smile', 'ground-trees', 'game-over', 'play-button-2'], 'honolulu': ['cloud', 'cube', 'cats', 'fish', 'snow', 'penguin', 'bird', 'no-shower', 'puppy', 'rain', 'tree-background', 'pencil', 'mouse-bubble', 'wings', 'bow', 'play-button'], 'houston': ['snow', 'cloud', 'pink-flower', 'star', 'cube', 'cat-animated', 'flight', 'bird', 'puppy', 'ground-trees', 'rain', 'wings', 'tree-background', 'mouse-bubble', 'play-button-2', 'bow'], 'irvine': ['trees', 'cats', 'rocks', 'fish', 'sticks', 'fighter-jet', 'penguin', 'no-shower', 'boat', 'dog-smile', 'timer', 'pencil', 'scrolling-backdrop-hills', 'bullet', 'game-over', 'play-button'], 'ithaca': ['rocks', 'cube', 'cloud', 'trees', 'fish', 'bird', 'cat-animated', 'fighter-jet', 'penguin', 'dog-smile', 'ground-trees', 'pencil', 'timer', 'tree-background', 'play-button-2', 'play-button'], 'louisville': ['sticks', 'pink-flower', 'star', 'snow', 'cats', 'puppy', 'flight', 'boat', 'no-shower', 'mouse-bubble', 'wings', 'bullet', 'rain', 'scrolling-backdrop-hills', 'bow', 'game-over'], 'miami': ['rocks', 'pink-flower', 'sticks', 'cats', 'snow', 'boat', 'puppy', 'flight', 'cat-animated', 'bullet', 'scrolling-backdrop-hills', 'dog-smile', 'wings', 'timer', 'play-button', 'game-over'], 'napa': ['star', 'trees', 'cloud', 'cube', 'fish', 'fighter-jet', 'bird', 'no-shower', 'penguin', 'tree-background', 'rain', 'mouse-bubble', 'pencil', 'ground-trees', 'play-button-2', 'bow'], 'nashville': ['snow', 'cats', 'trees', 'cloud', 'sticks', 'cat-animated', 'fighter-jet', 'no-shower', 'bird', 'mouse-bubble', 'pencil', 'scrolling-backdrop-hills', 'wings', 'bullet', 'play-button', 'play-button-2'], 'newark': ['fish', 'star', 'rocks', 'cube', 'pink-flower', 'puppy', 'boat', 'penguin', 'flight', 'dog-smile', 'ground-trees', 'rain', 'tree-background', 'timer', 'game-over', 'bow'], 'oakland': ['cube', 'rocks', 'star', 'cloud', 'fish', 'fighter-jet', 'boat', 'no-shower', 'bird', 'wings', 'pencil', 'bullet', 'dog-smile', 'ground-trees', 'game-over', 'play-button-2'], 'olympia': ['trees', 'sticks', 'pink-flower', 'cats', 'snow', 'flight', 'puppy', 'cat-animated', 'penguin', 'timer', 'rain', 'mouse-bubble', 'scrolling-backdrop-hills', 'tree-background', 'play-button', 'bow'], 'philadelphia': ['fish', 'snow', 'cats', 'rocks', 'pink-flower', 'boat', 'fighter-jet', 'bird', 'penguin', 'timer', 'mouse-bubble', 'bullet', 'tree-background', 'scrolling-backdrop-hills', 'bow', 'play-button'], 'princeton': ['trees', 'sticks', 'cube', 'star', 'cloud', 'cat-animated', 'no-shower', 'flight', 'puppy', 'pencil', 'wings', 'rain', 'dog-smile', 'ground-trees', 'play-button-2', 'game-over'], 'providence': ['fish', 'cube', 'cloud', 'snow', 'rocks', 'fighter-jet', 'bird', 'no-shower', 'penguin', 'scrolling-backdrop-hills', 'timer', 'pencil', 'mouse-bubble', 'dog-smile', 'play-button', 'bow'], 'richmond': ['cats', 'trees', 'sticks', 'pink-flower', 'star', 'cat-animated', 'boat', 'puppy', 'flight', 'ground-trees', 'bullet', 'wings', 'rain', 'tree-background', 'play-button-2', 'game-over'], 'sacramento': ['star', 'cube', 'sticks', 'rocks', 'fish', 'puppy', 'no-shower', 'cat-animated', 'penguin', 'rain', 'scrolling-backdrop-hills', 'bullet', 'mouse-bubble', 'ground-trees', 'bow', 'play-button-2'], 'seattle': ['trees', 'cloud', 'snow', 'pink-flower', 'cats', 'bird', 'boat', 'flight', 'fighter-jet', 'timer', 'wings', 'pencil', 'tree-background', 'dog-smile', 'play-button', 'game-over'], 'spokane': ['pink-flower', 'cloud', 'star', 'fish', 'snow', 'no-shower', 'bird', 'fighter-jet', 'boat', 'bullet', 'pencil', 'mouse-bubble', 'tree-background', 'timer', 'play-button', 'play-button-2'], 'tacoma': ['rocks', 'cats', 'cube', 'sticks', 'trees', 'penguin', 'flight', 'cat-animated', 'puppy', 'rain', 'wings', 'dog-smile', 'ground-trees', 'scrolling-backdrop-hills', 'bow', 'game-over'], 'york': ['snow', 'cube', 'trees', 'sticks', 'cats', 'bird', 'puppy', 'flight', 'cat-animated', 'wings', 'pencil', 'ground-trees', 'bullet', 'rain', 'play-button', 'game-over']}


export { genGifStates, gifTypes, showGifMap};
