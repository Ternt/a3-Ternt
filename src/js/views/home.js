import * as THREE from 'three';

const names = [
    [
        "Arobash",
        "Muraudim",
        "Horumak",
        "Dorimar",
        "Babark",
        "Oliwar",
        "Gryuwar",
        "Vanogri",
        "Felagh",
        "Gajener",
    ]
]

const nouns = [
    [ // items
        "Orb",
        "Sphere",
        "Staff",
        "Axe",
        "Blade",
        "Hound",
        "Golem",
        "Door",
        "Fleece",
        "Valley",
    ],
    [ // describers
        "Iron",
        "Light",
        "Darkness",
        "Steel",
        "Fire"
    ],
    [ // location names
        "Avernus",
        "Stormcrag",
        "Shadowvale",
        "Thornridge",
        "Ironcliff"
    ]
]

const adjectives = [
    "Golden",
    "Mystic",
    "Fiery",
    "Furious"
]


const Home = {
    render: async () => {
        return `
            <div id="main" class="body-section">
                <div id="content-feed">
                </div>
                <h1 id="card-name" class="text-[2rem] font-[600]"></h1>
                <button id="randomize" class="button">Randomize</button>
            </div>`;
    },
    after_render: async () => {
        const appState = JSON.parse(localStorage.getItem("appState"));

        function onClickOutside (element, callback) {
            document.onmousedown = (event) => {
                if (!element.contains(event.target)) callback();
            };
        }

        function onKeyPress(callback) {
            document.onkeydown = (event) => {
                callback();
            };
        }

        function fadeOut(element, duration) {
            element.style.transition = `opacity ${duration / 1000}s`;
            element.style.opacity = 0;

            setTimeout(() => {
                element.style.display = 'none';
                document.body.removeChild(element);
            }, duration);
        }

        function showModal() {
            const welcomeModal = document.createElement("div");
            welcomeModal.classList.add('welcome-modal-container');

            welcomeModal.innerHTML = `
            <div class="welcome-modal-box">
                <a class="welcome-modal-title">Greetings, traveler!</a>
                <p class="welcome-paragraph">Welcome to <a class="inline-bold">Card Collector</a>! A realm where fortune favors the bold and chance decides your destiny! Here, you may summon a card from the mystical depths of the unknown. Will it be an old relic, a powerful artifact, or perhaps a humble token of luck? Only the fates know!</p>
                <p class="welcome-paragraph">Once you've found a card you like, you may choose to save it to your account, share it with fellow adventurers, or even trade it for a handsome sum! So step forth, my friend, and let the winds of chance guide you. Who knows what wonders await? A card, a trade, and a fortune to be made!</p>
            </div>`;

            onClickOutside(welcomeModal, () => {
                document.onkeydown = null;
                fadeOut(welcomeModal, 1000);
                fadeOut(dimmingDiv, 1000);
                document.getElementById('content-feed').classList.remove('blur');
                document.onmousedown = null;
                appState.visited = true;
                localStorage.setItem("appState", JSON.stringify(appState));
            });

            onKeyPress(() => {
                document.onmousedown = null;
                fadeOut(welcomeModal, 1000);
                fadeOut(dimmingDiv, 1000);
                document.getElementById('content-feed').classList.remove('blur');
                document.onkeydown = null;
                appState.visited = true;
                localStorage.setItem("appState", JSON.stringify(appState));
            });

            const dimmingDiv   = document.createElement("div");
            dimmingDiv.id = 'dimming-div';
            document.getElementById('content-feed').classList.add('blur');

            document.body.appendChild(welcomeModal);
            document.body.appendChild(dimmingDiv);
        }

        function generateName() {
            function getRandomInt( max ) {
                return Math.floor(Math.random() * max);
            }

            let resultString = "";
            const starter = getRandomInt(2);
            switch (starter) {
                // starts with a name
                case 0: {
                    const raceId = getRandomInt(names.length);
                    const race = names[raceId];

                    const nameId = getRandomInt(race.length)
                    const name = names[raceId][nameId];

                    const locationId = getRandomInt(nouns[2].length);
                    const location = nouns[2][locationId];
                    resultString = `${name} of ${location}`;
                } break;
                // starts with the article "The"
                case 1: {
                    const starter = getRandomInt(2);
                    switch (starter) {
                        // starts with an item noun
                        case 0: {
                            const itemNounId = getRandomInt(nouns[0].length);
                            const itemNoun = nouns[0][itemNounId];

                            const nounType = getRandomInt(2) + 1;
                            const nounId = getRandomInt(nouns[nounType].length);
                            const noun = nouns[nounType][nounId];
                            resultString = `The ${itemNoun} of ${noun}`;
                        } break;
                        // starts with an adjective
                        case 1: {
                            const adjectiveId = getRandomInt(adjectives.length);
                            const adjective = adjectives[adjectiveId];

                            const nounId = getRandomInt(nouns[0].length);
                            const noun = nouns[0][nounId];
                            resultString = `The ${adjective} ${noun}`;
                        } break;
                    }
                }
            }
            return resultString;
        }


        const randomizeButton = document.getElementById("randomize");
        const cardName = document.getElementById("card-name");
        cardName.textContent = generateName();
        randomizeButton.addEventListener("click", () => {
            cardName.textContent = generateName();
        });

        if (!appState.visited) {
            showModal();
        }

        createCardCanvas();

        function createCardCanvas() {
            const canvas_area = document.getElementById('content-feed');
            const width = canvas_area.clientWidth, height = canvas_area.clientHeight;

            const scene = new THREE.Scene();
            scene.background = new THREE.Color( 0x1f1f1f );

            const camera = new THREE.PerspectiveCamera( 40, width / height, 0.01, 1000 );

            const renderer = new THREE.WebGLRenderer();

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;

            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( width, height );
            renderer.setAnimationLoop( animate );
            canvas_area.appendChild( renderer.domElement );


            const controls = new THREE.OrbitControls( camera, renderer.domElement );
            controls.listenToKeyEvents(window);
            controls.enableZoom     = false;
            controls.enableDamping  = true;
            controls.dampingFactor  = 0.05;
            controls.rotateSpeed    = 0.70;
            controls.maxPolarAngle  = Math.PI/2;
            controls.minPolarAngle  = Math.PI/2;

            const loader = new THREE.STLLoader();
            loader.load(
                'card.stl',
                function (geometry) {
                    const material = new THREE.MeshToonMaterial( { color: 0xffffff });
                    material.side = THREE.DoubleSide;

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.receiveShadow = true;
                    mesh.rotation.set( -Math.PI/10, 0, 0 );

                    scene.add(mesh);
                },
                (xhr) => {
                },
                (error) => {
                    console.log(error)
                }
            )

            const spotLight = new THREE.SpotLight( 0xffffff, 100 );
            spotLight.position.set( 1, 4, 1 );
            spotLight.angle = Math.PI / 6;
            spotLight.penumbra = 1;
            spotLight.decay = 2;
            spotLight.distance = 0;

            spotLight.castShadow = true;
            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;
            spotLight.shadow.camera.near = 1;
            spotLight.shadow.camera.far = 10;
            spotLight.shadow.focus = 1;

            scene.add( spotLight );

            camera.position.set( 0, 4, 3.5 );
            controls.update();

            let render = false;
            window.addEventListener('resize', () => {
                render = true;
            });

            function animate() {
                if (render) resize();

                controls.update();
                renderer.render( scene, camera );
            }
            animate();

            function resize() {
                render = false;

                const canvas_area = document.getElementById('content-feed');
                const width = canvas_area.clientWidth, height = canvas_area.clientHeight;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize( width, height );
            }
        }
    },
};

export default Home;
