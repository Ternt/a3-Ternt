import * as THREE from "three";


export function hashCode(s) {
    let h=0;
    for(let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;

    return h;
}


export const calculateUUID = (json) => {
    let initial = json.username[0] + json.password[0];

    // hash from only username + password
    const hash = hashCode(json.username + json.password);

    return initial + hash.toString();
}


export const generateName = (names, nouns, adjectives) => {
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
                    resultString = `The ${itemNoun}true of ${noun}`;
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


export const createCardCanvas = (renderDOMElement, texture) => {
    const element = renderDOMElement || document.body;
    const width = element.clientWidth, height = element.clientHeight;

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
    element.appendChild( renderer.domElement );


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

        const width = element.clientWidth, height = element.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize( width, height );
    }
}


export const checkAuthentication = async () => {
    const response = await fetch('user/check', { method: 'GET'});
    if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        return data;
    }
}

export const addCard = async  () => {
    const cardName = document.getElementById("card-name");
    const json     = { cardname: cardName.textContent };

    const response = await fetch('/card/add', {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(json),
    });
    if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        return data;
    }
}


export const LogoutAccount = async  () => {
    const response = await fetch('/user/logout', {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
    });

    window.location.reload();
}
