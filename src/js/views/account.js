import {addCard, checkAuthentication, createCardCanvas, LogoutAccount} from "../util.js";

const Account = {
    render: async () => {
        return `
            <div id="main" class="body-section flex-col justify-center items-center">
                <div class="flex flex-row">
                    <div class="container carousel w-[fit-content] flex">
                        <button id="backward" class="svg-buttons clickable">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-compact-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 20l-3 -8l3 -8" /></svg> 
                        </button>
                    </div>
                    <div id="content-feed">
                    </div>
                    <div class="container carousel w-[fit-content]">
                        <button id="forward" class="svg-buttons clickable">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-compact-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 4l3 8l-3 8" /></svg> 
                        </button>
                    </div>
                </div>
                <h1 id="card-name" class="text-[2rem] font-[600]"></h1>
            </div>`;
    },
    after_render: async () => {
        const data = await checkAuthentication();
        if ( data.authenticated ) {
            const ActionIcon = document.createElement('div');
            ActionIcon.classList.add('action-icon', 'glow-hover', 'clickable');
            ActionIcon.textContent = data.username;
            ActionIcon.onclick = () => {
                window.location.replace("http://localhost:3000/account");
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

            const LoginButton = document.getElementById('login-button');
            LoginButton.replaceWith(ActionIcon);
        }

        const response = await fetch('/card/get_user_cards', {method: 'GET'});
        const cards    = await response.json();
        const cardName = document.getElementById("card-name");
        cardName.textContent = cards.data[0].cardname;

        let count = 0;
        const forward = document.getElementById('forward');
        forward.onclick = (event) => {
            count += 1;
            if (count >= cards.data.length) {
                count = 0;
            }
            cardName.textContent = cards.data[count].cardname;
        };

        const backward = document.getElementById('backward');
        backward.onclick = (event) => {
            count -= 1;
            if (count < 0) {
                count = cards.data.length - 1;
            }

            cardName.textContent = cards.data[count].cardname;
        };

        const canvas_area = document.getElementById('content-feed');
        createCardCanvas(canvas_area);
    },
};

export default Account;
