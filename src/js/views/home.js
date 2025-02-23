import {generateName, createCardCanvas, checkAuthentication, addCard, LogoutAccount} from "../util.js";

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
            <div id="main" class="body-section flex-col justify-center items-center">
                <div id="content-feed">
                </div>
                <h1 id="card-name" class="text-[2rem] font-[600]"></h1>
                <div id="buttons" class="login-options"> 
                    <button id="randomize" class="button">Randomize</button>
                </div>
            </div>`;
    },
    after_render: async () => {
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
                localStorage.setItem("visited", "true");
            });

            onKeyPress(() => {
                document.onmousedown = null;
                fadeOut(welcomeModal, 1000);
                fadeOut(dimmingDiv, 1000);
                document.getElementById('content-feed').classList.remove('blur');
                document.onkeydown = null;
                localStorage.setItem("visited", "true");
            });

            const dimmingDiv   = document.createElement("div");
            dimmingDiv.id = 'dimming-div';
            document.getElementById('content-feed').classList.add('blur');

            document.body.appendChild(welcomeModal);
            document.body.appendChild(dimmingDiv);
        }

        if (!JSON.parse(localStorage.getItem("visited"))) {
            showModal();
        }

        const data = await checkAuthentication();
        if ( data.authenticated ) {
            const ActionIcon = document.createElement('button');
            ActionIcon.classList.add('action-icon', 'glow-hover', 'clickable');
            ActionIcon.textContent = data.username;
            if (data.username === "admin") {
                ActionIcon.onclick = () => {
                    const origin = window.location.origin;
                    const virtualPath = 'results';
                    window.location.replace(`${origin}/${virtualPath}`);
                }
            } else {
                ActionIcon.onclick = () => {
                    const origin = window.location.origin;
                    const virtualPath = 'account';
                    window.location.replace(`${origin}/${virtualPath}`);
                }
            }

            const LoginButton = document.getElementById('login-button');
            if (LoginButton) {
                LoginButton.replaceWith(ActionIcon);
            }

            if (!document.getElementById('logout')) {
                const Section = document.getElementById('account-tabs');
                const MenuTabs = document.createElement('div');
                const Logout = document.createElement('button');
                Logout.classList.add('action-icon', 'glow-hover', 'clickable');
                Logout.id = "logout"
                Logout.textContent = "Logout";
                Logout.onclick = LogoutAccount;

                MenuTabs.classList.add('menu-tabs');
                MenuTabs.appendChild(Logout);
                Section.appendChild(MenuTabs);
            }

            const LoginOptions = document.getElementById('buttons');
            const AddButton = document.createElement('button');
            AddButton.id = "add-card";
            AddButton.classList.add("button");
            AddButton.textContent = 'Add Card';
            AddButton.onclick = async () => {
                const data = await addCard();
                if (data) {
                    const randomizeButton = document.getElementById("randomize");
                    randomizeButton.click();
                }
            };

            LoginOptions.prepend(AddButton);
        }

        const randomizeButton = document.getElementById("randomize");
        const cardName = document.getElementById("card-name");
        cardName.textContent = generateName(names, nouns, adjectives);
        randomizeButton.addEventListener("click", () => {
            cardName.textContent = generateName(names, nouns, adjectives);
        });

        const canvas_area = document.getElementById('content-feed');
        createCardCanvas(canvas_area);
    },
};

export default Home;
